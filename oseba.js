import {Nastavi_Dejanje, Obarvajgumbe, Pridobinaslednje} from "./pripomocki.js";
import {Sprememba_Objave} from "./index.js";

class Objava {
    constructor(podatki) {
        Object.assign(this, podatki)
    }

    Premiknaslednje(dejanje) {
        const Uporaba = dejanje === 'vsecek' ? "jeBilVseckan" : dejanje === 'zavrnitev' && "jeBilZavrnjen"
        const Naslednja_Objava = Pridobinaslednje()
        if (Naslednja_Objava) {
            setTimeout(() => {
                if (this[Uporaba]) {
                    Sprememba_Objave(Naslednja_Objava)
                }
            }, 1000)
        }

    }

    Vsecek() {
        if (!this.jeBilVseckan) {
            this.jeBilZavrnjen = Nastavi_Dejanje('zavrni-gumb', 'zavrni-oznaceno', this.stevilo, false)
            this.jeBilVseckan = Nastavi_Dejanje('vsecek-gumb', 'vsecek-oznaceno', this.stevilo, true)
            this.Premiknaslednje('vsecek')
        }else {
            this.jeBilVseckan = Nastavi_Dejanje('vsecek-gumb', 'vsecek-oznaceno', this.stevilo, false)
        }
    }

    Zavrni() {
        if (!this.jeBilZavrnjen) {
            this.jeBilVseckan = Nastavi_Dejanje('vsecek-gumb', 'vsecek-oznaceno', this.stevilo, false)
            this.jeBilZavrnjen = Nastavi_Dejanje('zavrni-gumb', 'zavrni-oznaceno', this.stevilo, true)
            this.Premiknaslednje('zavrnitev')
        }else {
            this.jeBilZavrnjen = Nastavi_Dejanje('zavrni-gumb', 'zavrni-oznaceno', this.stevilo, false)
        }
    }

    Prikaz() {
        const {ime, slika, starost, opis, jeBilZavrnjen, jeBilVseckan, stevilo} = this
        this.jeBilVseckan && Obarvajgumbe(false, 'vsecek-gumb', 'vsecek-oznaceno')
        this.jeBilZavrnjen && Obarvajgumbe(false, 'zavrni-gumb', 'zavrni-oznaceno')
        return `
            <img class="slika-osebe" alt="${ime}" src="${slika}">
            ${jeBilVseckan ? `<img id="nalepka-${stevilo}" class="izbrano" src="./slike/badge-like.png" alt="Vsecek">` : ""}
            ${jeBilZavrnjen ? `<img id="nalepka-${stevilo}" class="izbrano" src="./slike/badge-nope.png" alt="Vsecek">` : ""}
            <div class="podatki-osebe">
                <h1 class="ime-osebe">${ime}, ${starost}</h1>
                <p class="kljuc-osebe">${opis}</p>
            </div>`
    }
}

export default Objava