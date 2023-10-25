const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const {
    getCompliment,
    getFortune,
    getCats,
    deleteCat,
    createCat,
    updateCatRating
} = require('./controller');

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get(`/api/cats`, getCats);
app.delete(`/api/cats/:id`, deleteCat);
app.post(`/api/cats`, createCat);
app.put(`/api/cats/:id`, updateCatRating);

app.listen(4000, () => console.log("Server running on 4000"));
