import Objava from "./oseba.js";
import {ZazeniObjave, Zacetek, Pridobinaslednje, NastaviosnovniHTML} from "./pripomocki.js";
import {Prikaznajboljsih} from "./prikaznajboljsih.js";
import './nacin.js'

export function Sprememba_Objave(Naslednja_Objava) {
    Trenutnaobjava = new Objava(Naslednja_Objava)
    Zacetek()
    ZazeniObjave(Trenutnaobjava)
}

export function Osnovna_Priprava() {
    document.getElementById('objava') ?
        document.getElementById('objava').style.display = 'block' : ""
    NastaviosnovniHTML()
    if (Pridobinaslednje()) {
        Trenutnaobjava = new Objava(Pridobinaslednje())
        ZazeniObjave(Trenutnaobjava)
        Nastavitevgumbov()
    }
}

document.getElementById('prikaz-najboljsih').addEventListener('click', () => {
    Prikaznajboljsih()
})

function Nastavitevgumbov() {
    document.getElementById('vsecek-gumb').addEventListener('click', () => {
        Trenutnaobjava.Vsecek()
        document.activeElement.blur()
    })

    document.getElementById('zavrni-gumb').addEventListener('click', () => {
        Trenutnaobjava.Zavrni()
        document.activeElement.blur()
    })
}

document.getElementById('osnovno').addEventListener('click',() => Osnovna_Priprava())

// Zacetni prikaz
let Trenutnaobjava
if (Pridobinaslednje()) {
    Trenutnaobjava = new Objava(Pridobinaslednje())
    ZazeniObjave(Trenutnaobjava)
    Nastavitevgumbov()
}
