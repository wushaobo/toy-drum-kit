import random

import magenta.music as mm
from magenta.models.drums_rnn import drums_rnn_sequence_generator

from magenta.protobuf import music_pb2, generator_pb2

pitch_collection = [
    36,         # C - Bass Drum 1
    40,         # E - Electric Snare
    41,         # F - Low Floor Tom
    44,         # G#- Pedal Hi-Hat
    48,         # c - Hi-Mid Tom
    50,         # d - High Tom
    51,         # eb- Ride Cymbal 1
    57          # a - Crash Cymbal 2
]


def _fetch_pitches():
    pitches = set()
    count = random.randint(1, 4)
    for i in range(count):
        pitch = pitch_collection[random.randint(0, 7)]
        pitches.add(pitch)

    return pitches


def build_note_sequence():
    sequence = music_pb2.NoteSequence()

    time_idx = 0
    for i in range(0, 10):
        pitches = _fetch_pitches()

        duration = random.randint(1, 5) / 10
        for pitch in pitches:
            sequence.notes.add(pitch=pitch, start_time=time_idx, end_time=time_idx + duration,
                               is_drum=True, instrument=10, velocity=80)
        time_idx += duration

    sequence.tempos.add(qpm=60)

    return sequence


def generate_sequence(input_sequence):
    rnn_model = _init_generator()

    num_steps = 120  # change this for shorter or longer sequences
    temperature = 1.2  # the higher the temperature the more random the sequence.

    generator_options = generator_pb2.GeneratorOptions()
    generator_options.args['temperature'].float_value = temperature

    last_end_time = max(n.end_time for n in input_sequence.notes) if input_sequence.notes else 0
    qpm = input_sequence.tempos[0].qpm
    seconds_per_step = 60.0 / qpm / rnn_model.steps_per_quarter
    start_time = last_end_time + seconds_per_step
    generation_seconds = num_steps * seconds_per_step

    generator_options.generate_sections.add(start_time=start_time, end_time=start_time+generation_seconds)
    sequence = rnn_model.generate(input_sequence, generator_options)

    return sequence


def _init_generator():
    bundle = mm.sequence_generator_bundle.read_bundle_file('./lib/drum_kit_rnn.mag')
    generator_map = drums_rnn_sequence_generator.get_generator_map()
    rnn_model = generator_map['drum_kit'](checkpoint=None, bundle=bundle)

    return rnn_model


random_sequence = build_note_sequence()
gen_sequence = generate_sequence(random_sequence)
mm.sequence_proto_to_midi_file(gen_sequence, "./output_generated_sequence.mid")
