import {Pridobilocalstorage} from "./pripomocki.js";
import osnova_zivali from "./navedbapodatkov.js"

function Novezivali(ponastavitev = false) {
    let podatki = Pridobilocalstorage("podatki") ?  Pridobilocalstorage("podatki") : []
    let Novezivali = []
    osnova_zivali.forEach((zival, index) => {
        let podatek = podatki.find((podatek) => podatek.slika == zival.slika)
        if (podatek && !ponastavitev) {
            Novezivali.push({...podatek, stevilo: index})
        } else {
            Novezivali.push({
                ...zival,
                stevilo: index,
                jeBilZavrnjen: false,
                jeBilVseckan: false
            })
        }
    })
    return Novezivali
}

let zivali = Novezivali()

function Ponastavitev_Zivali() {
    zivali = Novezivali(true)
}

export {zivali, Ponastavitev_Zivali}
