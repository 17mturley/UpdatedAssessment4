const cats = require("./db.json")
let globalId = 4

module.exports = {
getCompliment: (req, res) => {
    const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
},
getFortune: (req, res) => {
    const fortunes = ["Your mind is creative, original and alert.", "Your difficulties will strengthen you.", "The one that recognizes the illusion does not act as if it is real.", "The strong person understands how to withstand substantial loss.", "Swimming is easy. Stay floating is hard."];

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
},
getCats: (req, res) => res.status(200).send(cats),
deleteCat: (req, res) => {
    const { id } = req.params;

    for (let i = 0; i < cats.length; i++) {
        if (cats[i].id === +id) {
            cats.splice(i, 1);

            res.status(200).send(cats);
            return;
        }
    }
},
createCat: (req, res) => {
    const newCat = req.body;
    newCat.id = globalId;
    globalId++;
    cats.push(newCat);

    res.status(200).send(cats);
},
updateCatRating: (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    for (let i = 0; i < cats.length; i++) {
        if (cats[i].id === +id) {
            if (type === "plus" && cats[i].rating < 5) {
                cats[i].rating++;
                res.status(200).send(cats);
                return;
            }
            if (type === "minus" && cats[i].rating > 1) {
                cats[i].rating--;
                res.status(200).send(cats);
                return;
            }
        }
    }
}
}
