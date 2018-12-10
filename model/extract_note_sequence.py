import sys
from os import path

import magenta.music as mm

sys.path.append(path.dirname(path.dirname(__file__)))

from model.demo import generate_sequence


def work_on_midi():
    sequence_from_midi = mm.midi_file_to_note_sequence("/Users/wushaobo/Downloads/POP1.mid")

    # for note in sequence_from_midi.notes:
    #     if note.end_time > 9:
    #         sequence_from_midi.notes.remove(note)

    gen_sequence = generate_sequence(sequence_from_midi)

    mm.sequence_proto_to_midi_file(gen_sequence, "./output_generated_sequence.mid")


if __name__ == "__main__":
    work_on_midi()
