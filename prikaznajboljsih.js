import {zivali} from "./podatki.js";
import {Osnovna_Priprava} from "./index.js";
import Objava from "./oseba.js";
import {NastaviosnovniHTML, Obarvajgumbe, Prikaznajboljsih_gumbi} from "./pripomocki.js";

function Prikaznajboljsih() {
    NastaviosnovniHTML()
    document.getElementById('objava') ? document.getElementById('objava').style.display = 'none' : ""

    const Naslov = document.createElement('h1')
    Naslov.className = "priljubljene-osebe"
    Naslov.innerText = 'Priljubljene živali:'
    document.querySelector("main").append(Naslov)

    zivali.map((Niz) => {
        if (Niz.jeBilVseckan && !document.getElementById(`objava-${Niz.stevilo}`)) {
            const Oseba = document.createElement('section')
            Oseba.id = `objava-${Niz.stevilo}`
            Oseba.className = `prikaz-osebe`
            Oseba.innerHTML =
                `<div id='oseba-${Niz.stevilo}' class="oseba"></div>
                <div class="dejanja-osebe">
                    <button id="zavrni-${Niz.stevilo}" class="dejanje zavrni izbranost-${Niz.stevilo}">
                    <img src="./slike/icon-cross.png" alt="Zavrni"/></button>
                    <button id="vsecek-${Niz.stevilo}" class="dejanje vsecek izbranost-${Niz.stevilo}">
                    <img src="./slike/icon-heart.png" alt="Vsecek"/></button>
                </div>`

            document.querySelector('main').append(Oseba)
            let objava = new Objava(Niz)
            document.getElementById(`oseba-${Niz.stevilo}`).innerHTML = objava.Prikaz()
            objava.jeBilVseckan && Obarvajgumbe(false, `vsecek-${Niz.stevilo}`, 'vsecek-oznaceno')

            Prikaznajboljsih_gumbi(objava, Niz)
        }
    })

    if (!zivali.find(Niz => {
        if (Niz.jeBilVseckan) {
            return Niz
        }
    })) {
        Osnovna_Priprava()
    }
}


export {Prikaznajboljsih}