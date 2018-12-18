import * as MidiConvert from 'midiconvert'
import Tone from "tone";


const ACCEPTED_NOTES = [36, 40, 42, 45, 46, 48, 50, 51, 57];

class AutoBot {

	constructor(sound, visualization){
        this._sound = sound;
        this._visualization = visualization;

        this._newTrack()

		this._sendTimeout = -1
		this._heldNotes = {}
		this._lastPhrase = -1
	}

	_newTrack(){
		this._midi = new MidiConvert.create()
		this._track = this._midi.track()
	}

	send(){
		if (!this._track.length){
			return
		}

        let request = this._midi.slice(this._midi.startTime)
        let endTime = request.duration
        //shorten the request if it's too long
        if (endTime > 10) {
            request = request.slice(request.duration - 15)
            endTime = request.duration
        }

        this._newTrack()

        let config_api_url = document.getElementById("apiUrl").getAttribute('api-url');
        config_api_url = config_api_url === '###' ? "http://127.0.0.1:8080" : config_api_url;

        const data = {"sequence": request.toArray()};
        request.load(`${config_api_url}/hits`, JSON.stringify(data), 'POST').then((response) => {
            let removedDuplicate = response.slice(endTime / 2);
            const notes = removedDuplicate.tracks[2].notes;

            notes.forEach((note) => {
                this._perform(note);
            })
        }).catch((reason) => {
            alert("error reason: " + reason)
        });
        this._lastPhrase = -1
	}

	_accepted_note(note) {
        // migrate unsupported sound to most similar sound
        const mappedValue = {38: 40, 41: 45, 49: 57}[note.midi];
        if (mappedValue) {
            note.midi = mappedValue
        }

        let ret = ACCEPTED_NOTES.includes(note.midi);
	    if (!ret) {
	        console.log("unaccepted midi:", note.midi)
        }
        return ret
    }

    _perform(note) {
        const now = Tone.now() + 0.05

        if (this._accepted_note(note)) {
            this._sound.start(note.midi, note.noteOn + now)
            note.duration = note.duration * 0.9
            note.duration = Math.min(note.duration, 4)
            this._sound.stop(note.midi, note.noteOff + now)

            setTimeout(() => {
                this._visualization.visualizeHit(note.midi, '#FFB729')
            }, note.noteOn * 1000);
        }
    }

    startRecording(note, time=Tone.now()){
		if (this._track.length === 0 && this._lastPhrase === -1){
			this._lastPhrase = Date.now()
		}
		this._track.noteOn(note, time)
		clearTimeout(this._sendTimeout)
		this._heldNotes[note] = true
	}

	pauseRecording(note, time=Tone.now()){
		this._track.noteOff(note, time)
		delete this._heldNotes[note]

		if (Object.keys(this._heldNotes).length === 0){
			if (this._lastPhrase !== -1 && Date.now() - this._lastPhrase > 3000){
				// send something if there are no events for a moment
				this.send()
			} else {
				this._sendTimeout = setTimeout(this.send.bind(this), 600 + (time - Tone.now()) * 1000)
			}
		}
	}
}

export default AutoBot
