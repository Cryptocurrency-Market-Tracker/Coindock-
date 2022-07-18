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
        liCoinList.innerHTML = ` <button class = ${coin.id}> 
        <img src ="${coin.image} alt ="${coin.name}></img>
    <p> ${coin.name} </p></button>`
        iconElement.appendChild(liCoinList);

        // Initially nested inside of this method because i couldnt figure out how to make it its own function... 
        // cryptoApp.coinData = (coins) => {
        //     const buttons = (document.querySelectorAll('button'));
        //     buttons.forEach(function (coin) {
        //         coin.addEventListener('click', function () {
        //             const selectedCurrency = this.className;
        //             console.log(selectedCurrency)
        //             const coinArray = topTen.filter((crypto) => {
        //                 return (crypto.id == selectedCurrency);
        //             })
        //             coinObject = coinArray[0]
        //             console.log(coinObject)
        //         })
        //     })
        // }
    })
}
// identifies and compares selected coin with API. Returns object data based on selected coin. 
cryptoApp.coinData = (coins) => {
    const buttons = (document.querySelectorAll('button'));

    buttons.forEach(function (coin) {
        coin.addEventListener('click', function (event) {
            const selectedCurrency = this.className;
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
    console.log(`The current Price of ${coinObject.name} is $${(coinObject.current_price).toFixed(3)}`)
    const modalBox = document.querySelector('div')
    modalBox.innerHTML = "";
    const cryptoPrice = document.createElement('p');
    cryptoPrice.innerHTML = `$${(coinObject.current_price).toFixed(3)}`
    modalBox.appendChild(cryptoPrice);
}
// need to create modal layout with innerhtml which the coinData method will pass through to display the right info. 

document.addEventListener('click', function handleClickOutsideBox(event) {
    const box = document.getElementById('hello');
    const buttons = document.getElementById('lost');
  
    if (buttons.contains(event.target)) {
      box.style.display = "none";
    } 
  });
  

cryptoApp.init();