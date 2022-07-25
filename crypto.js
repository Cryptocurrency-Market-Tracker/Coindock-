const cryptoApp = {};
cryptoApp.url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
const bgBlur = document.getElementById("blur");



cryptoApp.init = () => {
    cryptoApp.marketData();
}


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
        .catch((err) => {
            if (err.message === "Not Found") {
                alert("The call was not successful. Did you mess with the Js?!")
            } else {
                alert("looks like we ran into some technical difficulties!")
            }

        })
}

// search method
cryptoApp.search = (result) => {
    const coinForm = document.querySelector('form');

    coinForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const coinInput = document.querySelector('input');
        const userCoin = (coinInput.value).toLocaleLowerCase();
        const modal = document.getElementById("modal");
        const coinSearch = result.filter(item => item.id.includes(userCoin) || item.symbol.includes(userCoin));
        const searchResult = coinSearch[0];

        if (searchResult !== undefined) {
            console.log(searchResult);
            modal.style.display = "";
            cryptoApp.displayCoinData(searchResult);

        } else {
            alert("please enter a proper coin");
        }

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
        liCoinList.innerHTML = ` <button class = ${coin.id}> 
        <img src ="${coin.image} alt ="${coin.name}></img>
    <p> ${coin.name} </p></button>`
        iconElement.appendChild(liCoinList);
    })
}
// identifies and compares selected coin with API. Returns object data based on selected coin. 
cryptoApp.coinData = (coins) => {
    const buttons = (document.querySelectorAll('button'));

    buttons.forEach(function (coin) {
        coin.addEventListener('click', function (event) {
            const selectedCurrency = this.className;
            // bgBlur.style.visibility = "hidden";


            const modal = document.getElementById("modal");
            modal.style.display = "";
            const coinArray = coins.filter((crypto) => {
                return (crypto.id == selectedCurrency);
            })
            const coinObject = coinArray[0]
            cryptoApp.displayCoinData(coinObject);
        })
    })
}

// Display coin data on modal(which we will create)
cryptoApp.displayCoinData = (coinObject) => {
    // console.log(`The current Price of ${coinObject.name} is $${(coinObject.current_price).toFixed(3)}`)
    const modalBox = document.querySelector('.modal')
    modalBox.innerHTML = "";
    const cryptoStats = document.createElement('p');
    const modalClose = document.createElement('button');
    modalClose.classList.add('close');

    modalClose.innerHTML = "<i class='fa-solid fa-rectangle-xmark fa-3x'></i>"
    bgBlur.style.visibility = "hidden";

    modalBox.innerHTML =
        `<h2> ${coinObject.name} - ${coinObject.symbol} </h2>
        
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
}

document.addEventListener('click', function handleClickOutsideBox(event) {
    const box = document.querySelector('.close');
    if (box.contains(event.target)) {
        modal.style.display = "none";
        bgBlur.style.visibility = "";
    }
});


cryptoApp.init();