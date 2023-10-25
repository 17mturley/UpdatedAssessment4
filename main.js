const complimentBtn = document.getElementById("complimentButton")
const catContainer = document.getElementById("cats-container")
const form = document.querySelector('form')
const fortuneBtn = document.getElementById("fortuneButton")

const baseURL = `http://localhost:4000/api/cats`;

const catsCallback = ({ data: cats }) => displayCats(cats);
const errCallback = err => console.log(err.response.data);

const getAllCats = () =>
    axios.get(baseURL).then(catsCallback).catch(errCallback);
const createCat = (body) =>
    axios.post(baseURL, body).then(catsCallback).catch(errCallback);
const deleteCat = (id) => 
    axios.delete(`${baseURL}/${id}`).then(catsCallback).catch(errCallback)
const updateCatRating = (id, type) =>
    axios
        .put(`${baseURL}/${id}`, { type })
        .then(catsCallback)
        .catch(errCallback);

function submitHandler(e) {
    e.preventDefault();

    let catName = document.getElementById("name");
    let catNickname = document.getElementById("nickname");
    let rating = document.querySelector('input[name="ratings"]:checked');
    let imageURL = document.getElementById("imageURL");

    let bodyObj = {
        name: catName.value,
        nickname: catNickname.value,
        rating: rating.value,
        imageURL: imageURL.value,
    };

    createCat(bodyObj);

    catName.value = ""
    catNickname.value = ""
    rating.checked = false
    imageURL.value = ""
}

function createCatCard(cat) {
    const catCard = document.createElement("div");
    catCard.classList.add("cat-card");

    catCard.innerHTML = `
    <img alt='cat cover' src=${cat.imageURL} class="cat-cover"/>
    <p class="cat-name">Name: ${cat.name}</p>
    <p class="cat-nickname">Nickname: ${cat.nickname}</p>
    <div class="btns-container">
        <button onclick="updateCatRating(${cat.id}, 'minus')">-</button>
        <p class="cat-rating">${cat.rating} Million Cute Points</p>
        <button onclick="updateCatRating(${cat.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteCat(${cat.id})">delete</button>
    `;

    catContainer.appendChild(catCard);
}

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
complimentBtn.addEventListener('click', getCompliment)


const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        })
}
fortuneBtn.addEventListener('click', getFortune)


function displayCats(arr) {
    catContainer.innerHTML = ``;
    for (let i = 0; i < arr.length; i++) {
        createCatCard(arr[i]);
    }
}

form.addEventListener('submit', submitHandler);

getAllCats();

