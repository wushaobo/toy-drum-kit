const drumList = () => {
    return [
        new Drum(36, "C2", "Bass Drum", "bass", 'A'),
        new Drum(40, "E2", "Electric Snare", "snare", 'S'),
        new Drum(41, "F2", "Low Floor Tom", "tom-low", 'D'),
        new Drum(42, "F#2", "Closed Hi-Hat", "hihat-closed", 'F'),
        new Drum(46, "A#2", "Open Hi-Hat", "hihat-open", 'G'),
        new Drum(48, "C3", "Hi-Mid Tom", "tom-mid", 'H'),
        new Drum(50, "D3", "High Tom", "tom-high", 'J'),
        new Drum(51, "D#3", "Ride Cymbal 1", "ride", 'K'),
        new Drum(57, "A3", "Crash Cymbal 2", "crash", 'L'),
    ];
}

class Drum {
    constructor(key, noteName, drumSound, audioFileName, hotKey) {
        this.key = key;
        this.noteName = noteName;
        this.drumSound = drumSound;
        this.audioFileName = audioFileName;
        this.hotKey = hotKey
    }
}

export default drumList
