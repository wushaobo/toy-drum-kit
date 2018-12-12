const drumList = () => [
    new Drum(36, "C2", "Bass Drum", "bass"),
    new Drum(40, "E2", "Electric Snare", "snare"),
    new Drum(41, "F2", "Low Floor Tom", "tom-low"),
    new Drum(42, "F#2", "Closed Hi-Hat", "hihat-closed"),
    new Drum(46, "A#2", "Open Hi-Hat", "hihat-open"),
    new Drum(48, "C3", "Hi-Mid Tom", "tom-mid"),
    new Drum(50, "D3", "High Tom", "tom-high"),
    new Drum(51, "D#3", "Ride Cymbal 1", "ride"),
    new Drum(57, "A3", "Crash Cymbal 2", "crash"),
];


class Drum {
    constructor(key, noteName, drumSound, audioFileName) {
        this.key = key;
        this.noteName = noteName;
        this.drumSound = drumSound;
        this.audioFileName = audioFileName;
    }
}

export default drumList;
