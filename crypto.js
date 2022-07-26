
// namespace-object creation
const cryptoApp = {};
// api url
cryptoApp.url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
const bgBlur = document.querySelectorAll(".blur");

// init function
cryptoApp.init = () => {
    cryptoApp.marketData();
}

// fetch api url data
cryptoApp.marketData = () => {
    const marketUrl = new URL(cryptoApp.url);
    fetch(marketUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(result => {
            cryptoApp.topList(result);
            cryptoApp.coinData(result);
            cryptoApp.search(result);

        })
        // error handling
        .catch((err) => {
            if (err.message === "Not Found") {
                alert("The call was not successful. Did you mess with the Js?!")
            } else {
                alert("looks like we ran into some technical difficulties!")
            }

        })
}

// search method - top 100 coins
cryptoApp.search = (result) => {
    const coinForm = document.querySelector('form');

    coinForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const coinInput = document.querySelector('input');
        const userCoin = (coinInput.value).toLocaleLowerCase();
        const modal = document.getElementById("modal");
        // filter by user input
        const coinSearch = result.filter(item => item.id.includes(userCoin) || item.symbol.includes(userCoin));
        const searchResult = coinSearch[0];
        // compare results and returns a value 
        if (searchResult !== undefined) {
            modal.style.display = "";
            cryptoApp.displayCoinData(searchResult);

        } else {
            alert("please enter a proper coin");
        }

    })
}

// Identifies top 10 coins on the market WITH .FILTER ADVANCED ARRAY METHODS.
cryptoApp.topList = (result) => {
    const carouselElement = document.querySelector('.carouselSlide');
    const topTen = result.filter((coins) => {
        return (coins.market_cap_rank < 11);
    });

    // display top 10 coins. 
    const firstCoin = topTen[9];
    const coinList = document.createElement('img');
    coinList.src = `${firstCoin.image}`;
    coinList.id = `${firstCoin.id}`;
    coinList.classList = 'lastClone';
    coinList.alt = `${firstCoin.name}`;
    carouselElement.appendChild(coinList);

    topTen.forEach((coin) => {
        const coinList = document.createElement('img');
        coinList.src = `${coin.image}`;
        coinList.id = `${coin.id}`;
        coinList.alt = `${coin.name}`;
        coinList.classList = 'coin';
        carouselElement.appendChild(coinList);
    })
    const lastCoin = topTen[0];
    const coinList2 = document.createElement('img');
    coinList2.src = `${lastCoin.image}`;
    coinList2.id = `${lastCoin.id}`;
    coinList2.classList = 'firstClone';
    coinList2.alt = `${lastCoin.name}`;
    carouselElement.appendChild(coinList2);
    cryptoApp.carousel();
}
// line 36 changed to ID and added class
// identifies and compares selected coin with API. Returns object data based on selected coin. 
cryptoApp.coinData = (coins) => {
    const buttons = (document.querySelectorAll('.coin')); //changed to target class

    buttons.forEach(function (coin) {
        coin.addEventListener('click', function (event) {
            const modal = document.getElementById("modal");
            const selectedCurrency = this.id;
            modal.style.display = "";
            const coinArray = coins.filter((crypto) => {
                return (crypto.id == selectedCurrency);
            })
            const coinObject = coinArray[0];
            cryptoApp.displayCoinData(coinObject);
        })
    })
}

// Display coin data on modal(which we will create)
cryptoApp.displayCoinData = (coinObject) => {
    
    const modalBox = document.querySelector('.modal')
    modalBox.innerHTML = "";

    const cryptoStats = document.createElement('p');
    const modalClose = document.createElement('button');
    modalClose.classList.add('close');

    modalClose.innerHTML = "<i class='fa-solid fa-rectangle-xmark fa-3x'></i>"
    bgBlur.forEach(function (event) {
        event.style.visibility = "hidden";
    })

    modalBox.innerHTML =
        `<div class= modalCoinName>
        <h2> ${coinObject.name} - ${coinObject.symbol} </h2>
        </div>
        <div class = marketVisualData>
        <img src = "./assets/${coinObject.symbol}.png" alt ="${coinObject.name}">
        </div>
        <div class = "marketCoinData">
        <p> Coin ranking: ${coinObject.market_cap_rank} </p>
        <p> Current Price: $${(coinObject.current_price).toFixed(3)}</p>
        <p> Lowest Price within 24 hours: $${(coinObject.low_24h).toFixed(3)}</p>
        <p> Higest Price within 24 hours: $${(coinObject.high_24h).toFixed(3)}</p>
        <p> Price change within 24 hours: $${(coinObject.price_change_24h).toFixed(4)} </p>
        <p> Total Volume: ${(coinObject.total_volume).toLocaleString()}</p>
        <p> Market Cap: $${((coinObject.market_cap).toLocaleString())} </p>
        </div>
    `
    modalBox.append(modalClose);
    document.addEventListener('click', function handleClickOutsideBox(event) {
        const box = document.querySelector('.close');
        if (box.contains(event.target)) {
            modal.style.display = "none";
            bgBlur.forEach(function (event) {
                event.style.visibility = "";
            })
        }
    });
}

// For the Carousel 

// target all the relevant carousel items
cryptoApp.carousel = () => {
    const carouselSlide = document.querySelector('.carouselSlide');
    const carouselImages = document.querySelectorAll('.carouselSlide img');
    const leftButton = document.querySelector('#left');
    const rightButton = document.querySelector('#right');


    let counter = 1;
    const size = carouselImages[0].clientWidth;

    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// on right/left click movement + append name of coin
   
    rightButton.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) return;
        carouselSlide.style.transition = "transform 0.2s ease-in-out";
        counter++;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        cryptoApp.coinName = document.querySelector('.coinName');
        cryptoApp.coinName.innerHTML = "";
        cryptoApp.coinText = document.createElement('p');
        cryptoApp.coinText.textContent = `${carouselImages[counter].id}`;
        cryptoApp.coinName.appendChild(cryptoApp.coinText)
    })

    leftButton.addEventListener('click', () => {
        if (counter <= 0) return;
        carouselSlide.style.transition = "transform 0.2s ease-in-out";
        counter--;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        cryptoApp.coinName.innerHTML = "";
        cryptoApp.coinText.textContent = `${carouselImages[counter].id}`;
        cryptoApp.coinName.appendChild(cryptoApp.coinText)
    })

    carouselSlide.addEventListener('transitionend', () => {
        if (carouselImages[counter].className === 'lastClone') {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - 2;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        if (carouselImages[counter].className === 'firstClone') {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - counter;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    })
}

cryptoApp.init();
