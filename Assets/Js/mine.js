const newsContainer = document.querySelector(".news-container");
const countryLinks = document.querySelectorAll("nav ul li a");
const categoryLinks = document.querySelectorAll("aside a");
let countryCode = "eg";
let categoryCode = "business";
for (let i = 0; i < countryLinks.length; i++) {
  countryLinks[i].addEventListener("click", (e) => {
    newsContainer.innerHTML = `<div class="loader"></div>`;
    const activeLink = document.querySelector("nav ul li a.active");
    activeLink.classList.remove("active");
    e.target.classList.add("active");
    countryCode = e.target.getAttribute("data-country");
    getNews(countryCode, categoryCode);
  });
}

for (let i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener("click", (e) => {
    newsContainer.innerHTML = `<div class="loader"></div>`;
    const activeLink = document.querySelector("aside ul li a.active");
    activeLink.classList.remove("active");
    e.target.classList.add("active");
    categoryCode = e.target.getAttribute("data-category");
    getNews(countryCode, categoryCode);
  });
}

const fakeImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1362px-Placeholder_view_vector.svg.png";

async function getNews(contryCode = "eg", category = "business") {
  const response =
    await fetch(`https://newsapi.org/v2/top-headlines?country=${contryCode}&category=${category}&apiKey=2f5a560022b14c4c83ab2168a73f342b
  `);
  const data = await response.json();
  displayNews(data.articles);
}

function displayNews(arr) {
  let boxContainer = "";
  for (let i = 0; i < arr.length; i++) {
    boxContainer += `
  <article class="col-md-4 ">
      <div class="inner shadow h-100  rounded-3 p-3 d-flex flex-column justify-content-between ">
          <img src="${arr[i].urlToImage ? arr[i].urlToImage : fakeImage}"
              class="img-fluid rounded-top-3" alt="">
          
              <h2 class="h4">${arr[i].title}</h2>
              <p>${arr[i].description}</p>
              <a href="${
                arr[i].url
              }" target="_blank" class="btn btn-primary">Read more</a>
          
      </div>
  </article>
`;
  }
  newsContainer.innerHTML = boxContainer;
}

getNews();
