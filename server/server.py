import os
import tempfile
from io import BytesIO

import magenta.music as mm
import pretty_midi
import tornado
from magenta.models.drums_rnn import drums_rnn_sequence_generator
from magenta.protobuf import generator_pb2
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.web import Application, RequestHandler


def _generate_sequence(input_sequence):
    rnn_model = _init_generator()

    num_steps = 60  # change this for shorter or longer sequences
    temperature = 1.2  # the higher the temperature the more random the sequence.

    generator_options = _generator_options(input_sequence, num_steps, rnn_model, temperature)
    sequence = rnn_model.generate(input_sequence, generator_options)

    return sequence


def _generator_options(input_sequence, num_steps, rnn_model, temperature):
    generator_options = generator_pb2.GeneratorOptions()
    generator_options.args['temperature'].float_value = temperature

    last_end_time = max(n.end_time for n in input_sequence.notes) if input_sequence.notes else 0
    qpm = input_sequence.tempos[0].qpm
    seconds_per_step = 60.0 / qpm / rnn_model.steps_per_quarter

    start_time = last_end_time + seconds_per_step
    generation_seconds = num_steps * seconds_per_step
    generator_options.generate_sections.add(start_time=start_time, end_time=start_time + generation_seconds)
    return generator_options


def _init_generator():
    bundle_file = mm.sequence_generator_bundle.read_bundle_file('./lib/drum_kit_rnn.mag')
    generator_map = drums_rnn_sequence_generator.get_generator_map()
    generator = generator_map['drum_kit'](bundle=bundle_file)

    return generator


def generate_midi(input_midi):
    primer_sequence = mm.midi_to_sequence_proto(input_midi)
    generated_sequence = _generate_sequence(primer_sequence)

    output = tempfile.NamedTemporaryFile()
    mm.sequence_proto_to_midi_file(generated_sequence, output.name)
    output.seek(0)
    return output


class BaseHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    def options(self):
        self.set_status(204)
        self.finish()


class HitHandler(BaseHandler):

    def post(self):
        body = tornado.escape.json_decode(self.request.body)
        input_midi = pretty_midi.PrettyMIDI(BytesIO(bytes(body['sequence'])))

        ret_midi = generate_midi(input_midi)

        self.set_header('Content-Type', 'audio/midi')
        self.set_header('Content-Disposition', 'attachment; filename=reply.mid')
        while True:
            content = ret_midi.file.read()
            if not content:
                break
            self.write(content)
        self.finish()


def _run_server(http_port, num_processes):
    routes = [(r'/hits', HitHandler)]

    app = Application(handlers=routes, autoreload=False)
    server = HTTPServer(app)
    server.bind(http_port)

    print("Start HTTP listening")
    try:
        server.start(num_processes)
        IOLoop.current().start()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    _http_port = os.environ.get("HTTP_PORT", 8080)
    _http_process_count = os.environ.get("HTTP_PROCESS_COUNT", 4)

    _run_server(_http_port, _http_process_count)
