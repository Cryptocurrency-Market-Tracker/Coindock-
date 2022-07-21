const cryptoApp = {};
cryptoApp.url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"



cryptoApp.init = () => {
    cryptoApp.marketData();
}


cryptoApp.marketData = () => {
    const marketUrl = new URL(cryptoApp.url);
    fetch(marketUrl)
        .then(response => {
            return response.json();
        })
        .then(result => {
            cryptoApp.topList(result);
            cryptoApp.coinData(result);
        })
}

// Identifies top 10 coins on the market WITH .FILTER ADVANCED ARRAY METHODS.
cryptoApp.topList = (result) => {
    const iconElement = document.querySelector('.iconButtons');
    const topTen = result.filter((coins) => {
        return (coins.market_cap_rank < 11);
    });

    // display top 10 coins. 
    topTen.forEach((coin) => {
        const liCoinList = document.createElement('li');
        liCoinList.innerHTML = ` <button id = '${coin.id}' class = coin>    
        <img src ="${coin.image} alt ="${coin.name}></img>
    <p> ${coin.name} </p></button>`
        iconElement.appendChild(liCoinList);
    })
}
// line 36 changed to ID and added class
// identifies and compares selected coin with API. Returns object data based on selected coin. 
cryptoApp.coinData = (coins) => {
    const buttons = (document.querySelectorAll('.coin')); //changed to target class

    buttons.forEach(function (coin) {
        coin.addEventListener('click', function (event) {
            const selectedCurrency = this.id; // changed to ID 
            document.getElementById("myDiv").style.display = "";
            console.log(selectedCurrency)
            const coinArray = coins.filter((crypto) => {
                return (crypto.id == selectedCurrency);
            })
            const coinObject = coinArray[0]
            console.log(coinObject)
            cryptoApp.displayCoinData(coinObject);
        })
    })
}

// Display coin data on modal(which we will create)
cryptoApp.displayCoinData = (coinObject) => {
    // console.log(`The current Price of ${coinObject.name} is $${(coinObject.current_price).toFixed(3)}`)
    const modalBox = document.querySelector('#myDiv') //changed to target modal class
    modalBox.innerHTML = "";
    const cryptoStats = document.createElement('p');
    const modalClose = document.createElement('button');
    modalClose.classList.add('close');
    modalBox.innerHTML = 
    ` <h2> ${coinObject.name} - ${coinObject.symbol} </h2>
    <p> Coin ranking: ${coinObject.market_cap_rank} </p>
    <p> Current Price: $${(coinObject.current_price).toFixed(3)}</p>
    <p> Lowest Price within 24 hours: $${(coinObject.low_24h).toFixed(3)}</p>
    <p> Higest Price within 24 hours: $${(coinObject.high_24h).toFixed(3)}</p>
    <p> Price change within 24 hours: $${(coinObject.price_change_24h).toFixed(4)} </p>
    <p> Total Volume: ${(coinObject.total_volume).toLocaleString()}</p>
    <p> Market Cap: ${((coinObject.market_cap).toLocaleString())} </p>`
    modalBox.append(modalClose);
}
// need to create modal layout with innerhtml which the coinData method will pass through to display the right info. 

// cryptoApp.events = () => {
//     document.querySelector('#close').addEventListener('click', function (){
//         const userSelection = this.value;
//         artApp.getArt(userSelection);
//     })
// }

// cryptoApp.boxClose = () => {
//     document.getElementsByClassName('close').onclick = function (){
        
//     }
// }
// document.addEventListener('click', function handleClickOutsideBox(event) {
//     const box = document.querySelector('.close');
//     if (box.contains(event.target)) {
//       myDiv.style.display = "none";
//     } 
//   });
  
// For the Carousel (June 19)

const carouselSlide = document.querySelector('.carouselSlide');
const carouselImages = document.querySelectorAll('.carouselSlide img');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');

let counter = 1;
const size = carouselImages[0].clientWidth;
console.log(carouselImages);

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

rightButton.addEventListener('click', () => {
    if(counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    console.log(counter);
})

leftButton.addEventListener('click', () => {
    if(counter <= 0 ) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    console.log(counter);
})

carouselSlide.addEventListener('transitionend',()=>{
    if (carouselImages[counter].id === 'lastClone'){
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone'){
        console.log(counter);
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

})

// cryptoApp.carousel = () => {
//     const buttons = (document.querySelectorAll('.carouselButton')); //changed to target class
//     buttons.forEach(function (button) {
//         button.addEventListener('click', function () {
//             const offset = button.dataset.carouselButton === "right" ? 1 : -1;
//             const slides = button.closest("[dataCarousel]").querySelector("[dataSlides]");
//             const activeSlide = slides.querySelector("[dataActive]")
//             let newIndex = [...slides.children].indexOf(activeSlide) + offset;
//             console.log(newIndex);
//             if (newIndex < 0) newIndex = slides.children.length - 1 
//             if (newIndex >= slides.children.length) newIndex = 0
//             slides.children[newIndex].dataset.active = true 
//             delete activeSlide.dataset.active 
//         })
//     })
// }

// cryptoApp.carousel = () => {
//     const carouselButtons = document.querySelector('.carouselButton')
//     carouselButtons.forEach(function (buttons) {
//             carouselButtons.addEventListener("click", function () {
//                 console.log(carouselButtons);
//             });
//         })
// }


cryptoApp.init();



