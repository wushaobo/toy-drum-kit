import drumList from "./model";
import Tone from "tone";

class Sound {
    constructor() {
        this._players = null
        this._loaded = false

        Tone.Buffer.on('load', () => {
			this._loaded = true

            drumList().forEach((drum) =>{
                let player = this._players.get(drum.key);
                if (!player.loaded) {
                    alert(`Failed to load the player source: ${drum.key} ${drum.audioFileName}`)
                }
            })
		})
    }

    _constructUrls(drums) {
        let urls = {}
        const baseUrl = "audio"

        drums.forEach((drum) => {
            urls[drum.key] = `${baseUrl}/${drum.audioFileName}.mp3`
        })

        return urls
    }

    load() {
        const urls = this._constructUrls(drumList())

        this._players = new Tone.Players(urls).toMaster()
    }

    hit(note) {
        if (!this._loaded) {
            return
        }

        const player = this._players.get(note)
        const time = Tone.now()
        player.start(time)
        player.stop(time + 2)
    }

    // for the play with specified duration
    start(note, time=Tone.now()) {
        if (!this._loaded) {
            return
        }

        const player = this._players.get(note)
        player.start(time)
    }

    // for the play with specified duration
    stop(note, time=Tone.now()) {
        if (!this._loaded) {
            return
        }

        const player = this._players.get(note)
        player.stop(time)
    }

}

export default Sound
