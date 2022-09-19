const Gumb = document.getElementById("nacin")
const Telo = document.querySelector("body")

let Nacin = localStorage.getItem("nacin") ? JSON.parse(localStorage.getItem("nacin")) : "svetlo"

const Preverinacin = (spremenjeno = false) => {
    if (Nacin === "temno") {
        Telo.classList.add("temni-nacin")
    }
    else if (spremenjeno) {
        Telo.classList.remove("temni-nacin")
    }
    localStorage.setItem("nacin", JSON.stringify(Nacin))
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem("nacin")) {
        Nacin = "temno"
        Preverinacin()
    }
}

Gumb.addEventListener('click', () => {
    Nacin === "svetlo" ? Nacin = "temno" : Nacin = "svetlo"
    Preverinacin(true)
})

Preverinacin()