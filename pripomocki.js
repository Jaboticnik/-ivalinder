import {Ponastavitev_Zivali, zivali} from "./podatki.js";
import {Osnovna_Priprava} from "./index.js";

function Nastavi_Dejanje(gumb, oznaka, stevilo, vrednost, prikaz = 'oseba') {
    const Znacka = oznaka === 'vsecek-oznaceno' ? "like" : oznaka === 'zavrni-oznaceno' ? "nope" : "like"
    const Podatki = oznaka === 'vsecek-oznaceno' ? "jeBilVseckan" : oznaka=== 'zavrni-oznaceno' && "jeBilZavrnjen"
    if (vrednost) {
        document.getElementById(prikaz).innerHTML +=
            `<img id="nalepka-${stevilo}" class="izbrano" src="./slike/badge-${Znacka}.png" alt="Vsecek">`
        Obarvajgumbe(false, gumb, oznaka)
    }else {
        document.getElementById(`nalepka-${stevilo}`) && document.getElementById(`nalepka-${stevilo}`).remove()
        Obarvajgumbe(true, gumb, oznaka)
    }
    zivali[stevilo][Podatki] = vrednost
    Shranivlocalstorage('podatki', zivali)
    return vrednost
}

function Obarvajgumbe(ponastavi, gumb, oznaka) {
    document.getElementById('zavrni-gumb').classList.remove("zavrni-oznaceno")
    document.getElementById('vsecek-gumb').classList.remove("vsecek-oznaceno")
    !ponastavi && document.getElementById(gumb).classList.add(oznaka)
}

function Shranivlocalstorage(ime, vsebina) {
    const Vsebina = JSON.stringify(vsebina)
    localStorage.setItem(ime, Vsebina)
}

function Pridobilocalstorage(ime) {
    return JSON.parse(localStorage.getItem(ime))
}

function Zacetek() {
    Obarvajgumbe(true, 'vsecek-gumb', 'vsecek-oznaceno')
}

function ZazeniObjave(objava) {
    document.getElementById('oseba').innerHTML = objava.Prikaz()
}

function Pridobinaslednje() {
        const oseba = zivali.filter((predmet) => {
            if (!predmet.jeBilZavrnjen && !predmet.jeBilVseckan) {
                return predmet
            }
        })

    const Stevnik = Math.floor(Math.random() * (oseba.length))

    return oseba[Stevnik] ? oseba[Stevnik] : Navoljonivecoseb()
}

function Navoljonivecoseb() {
    document.querySelector('main').innerHTML =
        `<h1 class="nedostopno">Trenutno ni na voljo več razpoložljivih oseb</h1>
        <button id="ponovi" class="ponovi-gumb">Ponastavi</button>`

    document.getElementById('ponovi').addEventListener('click', () => {
        localStorage.removeItem('podatki')
        Ponastavitev_Zivali()
        document.getElementById('osnovno').click()
    })

}

function NastaviosnovniHTML(vrni) {
    if (vrni) {
        return  `<section id="objava" class="prikaz-osebe nosilec">
            <div id='oseba' class="oseba"></div>
            <div class="dejanja-osebe">
                <button id="zavrni-gumb" class="dejanje zavrni"><img src="./slike/icon-cross.png" alt="Zavrni"/></button>
                <button id="vsecek-gumb" class="dejanje vsecek"><img src="./slike/icon-heart.png" alt="Vsecek"/></button>
            </div>
        </section>`
    }else {
        document.querySelector(`main`).innerHTML =
            `<section id="objava" class="prikaz-osebe nosilec">
            <div id='oseba' class="oseba"></div>
            <div class="dejanja-osebe">
                <button id="zavrni-gumb" class="dejanje zavrni"><img src="./slike/icon-cross.png" alt="Zavrni"/></button>
                <button id="vsecek-gumb" class="dejanje vsecek"><img src="./slike/icon-heart.png" alt="Vsecek"/></button>
            </div>
        </section>`
    }
}

function Prikaznajboljsih_gumbi(objava, Niz) {
    document.getElementById(`zavrni-${Niz.stevilo}`).addEventListener('click', () => {
        document.activeElement.blur()
        document.getElementById(`vsecek-${Niz.stevilo}`).classList.remove("vsecek-oznaceno")
        Obarvajgumbe(true, `vsecek-${Niz.stevilo}`, 'vsecek-oznaceno')
        if (!objava.jeBilZavrnjen) {
            objava.jeBilVseckan = Nastavi_Dejanje(`vsecek-${Niz.stevilo}`, 'vsecek-oznaceno',
                Niz.stevilo, false, `oseba-${Niz.stevilo}`)
            objava.jeBilZavrnjen = Nastavi_Dejanje(`zavrni-${Niz.stevilo}`, 'zavrni-oznaceno',
                Niz.stevilo, true, `oseba-${Niz.stevilo}`)
        } else {
            document.getElementById(`zavrni-${Niz.stevilo}`).classList.remove("zavrni-oznaceno")
            objava.jeBilZavrnjen = Nastavi_Dejanje(`zavrni-${Niz.stevilo}`, 'zavrni-oznaceno',
                Niz.stevilo, false, `oseba-${Niz.stevilo}`)
        }

        setTimeout(() => {
            if (!objava.jeBilVseckan) {
                document.getElementById(`objava-${Niz.stevilo}`).remove()
            }

            if (!zivali.find(Niz => {
                if (Niz.jeBilVseckan) {
                    return Niz
                }
            })) {
                Osnovna_Priprava()
            }
        },1000)

    })

    document.getElementById(`vsecek-${Niz.stevilo}`).addEventListener('click', () => {
        document.activeElement.blur()
        document.getElementById(`vsecek-${Niz.stevilo}`).classList.remove("vsecek-oznaceno")
        if (!objava.jeBilVseckan) {
            objava.jeBilZavrnjen = Nastavi_Dejanje(`zavrni-${Niz.stevilo}`, 'zavrni-oznaceno',
                Niz.stevilo, false, `oseba-${Niz.stevilo}`)
            objava.jeBilVseckan = Nastavi_Dejanje(`vsecek-${Niz.stevilo}`, 'vsecek-oznaceno',
                Niz.stevilo, true, `oseba-${Niz.stevilo}`)
        } else {
            document.getElementById(`vsecek-${Niz.stevilo}`).classList.remove("vsecek-oznaceno")
            objava.jeBilVseckan = Nastavi_Dejanje(`vsecek-${Niz.stevilo}`, 'vsecek-oznaceno',
                Niz.stevilo, false, `oseba-${Niz.stevilo}`)
        }

        setTimeout(() => {
            if (!objava.jeBilVseckan) {
                document.getElementById(`objava-${Niz.stevilo}`)
                &&document.getElementById(`objava-${Niz.stevilo}`).remove()
            }

            if (!zivali.find(Niz => {
                if (Niz.jeBilVseckan) {
                    return Niz
                }
            })) {
                Osnovna_Priprava()
            }
        },1000)

    })
}

export {Nastavi_Dejanje, Obarvajgumbe, Shranivlocalstorage, Pridobilocalstorage, Zacetek, ZazeniObjave,
    Prikaznajboljsih_gumbi, Pridobinaslednje, Navoljonivecoseb, NastaviosnovniHTML}