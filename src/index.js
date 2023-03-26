// write your code here
const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
const newRamenForm = document.getElementById("new-ramen");

let ramenData = [];

fetch("http://localhost:3000/ramens")
  .then(response => response.json())
  .then(data => {
    ramenData = data;
    displayRamenImages();
  });

function displayRamenImages() {
  ramenMenu.innerHTML = "";
  ramenData.forEach(ramen => {
    const img = document.createElement("img");
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener("click", () => displayRamenDetail(ramen));
    ramenMenu.appendChild(img);
  });
}

function displayRamenDetail(ramen) {
  ramenDetail.innerHTML = `
    <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
    <h2 class="name">${ramen.name}</h2>
    <h3 class="restaurant">${ramen.restaurant}</h3>
    <h3>Rating:</h3>
    <p><span id="rating-display">${ramen.rating}</span> / 10</p>
    <h3>Comment:</h3>
    <p id="comment-display">${ramen.comment}</p>
  `;
}

newRamenForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = event.target.name.value;
  const restaurant = event.target.restaurant.value;
  const image = event.target.image.value;
  const rating = event.target.rating.value;
  const comment = event.target["new-comment"].value;
  const newRamen = { name, restaurant, image, rating, comment };
  ramenData.push(newRamen);
  displayRamenImages();
  event.target.reset();
});
