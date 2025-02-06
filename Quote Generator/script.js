const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");


let apiQuotes = [];

const loading = (flag) => {
    loader.hidden = !flag;
    quoteContainer.hidden = flag;
}


const newQuote = () => {
    const {text, author} = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteText.textContent = text;
    quoteAuthor.textContent = author ? author : "Unknown";
    if (text.length > 50) { 
        quoteText.classList.add("long-quote")
     } else { 
        quoteText.classList.remove("long-quote");
     }
}


const getQuotes = async() => {
    //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    //const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    
    loading(true);
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        alert(`Ooops! ${error.message}`);
    }
    loading(false);
}


const tweetQuote = () => {
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(tweeterUrl, "_blank")
}

// Event Listeners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

getQuotes();
quoteContainer.hidden = true;