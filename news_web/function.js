const API_KEY = "fa2599bcfd874d7dbd375a0b77217a7d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("sports"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch news");
        
        const data = await res.json();
        console.log(data);

        if (data.articles && data.articles.length > 0) {
            bindData(data.articles);
        } else {
            console.warn("No articles found.");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        // Optional: Display an error message to the user
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return; // Skip articles without images
        
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector('#news-img');
  const newsTitle = cardClone.querySelector('#news-title');
  const newsSource = cardClone.querySelector('#news-source');
  const newsDesc = cardClone.querySelector('#news-desc');

  // Check if each element exists before setting properties
  if (newsImg) newsImg.src = article.urlToImage;
  if (newsTitle) newsTitle.innerHTML = article.title;
  if (newsDesc) newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  if (newsSource) newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank");
  });
}

let curSelectedNav=null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;

})

function reload(){
    window.location.reload();
}