/* setup express */
const express = require('express');

const app = express();
app.use(express.json());

/* setup dotenv */
const dotenv = require('dotenv');
dotenv.config();

/* setup cors */
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

/* setup CoinAPI based on its GitHub documentation */
const SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi/coinapi_v1")["default"];
const sdk = new SDK(process.env.COINAPI_KEY);

// symbol_id: 'BINANCE_SPOT_BTC_USDT', 'COINBASE_SPOT_BTC_USD', 'KRAKEN_SPOT_BTC_USD', 'GEMINI_SPOT_BTC_USD'
// symbol_id: 'BINANCE_SPOT_ETH_USDT', 'COINBASE_SPOT_ETH_USD', 'KRAKEN_SPOT_ETH_USD', 'GEMINI_SPOT_ETH_USD'

let btc = [];
let eth = [];

const getPrices = async () => {
    try {
        // btc
        let binanceBtc = await sdk.orderbooks_current_data_symbol("BINANCE_SPOT_BTC_USDT");
        let coinbaseBtc = await sdk.orderbooks_current_data_symbol("COINBASE_SPOT_BTC_USD");
        let krakenBtc = await sdk.orderbooks_current_data_symbol("KRAKEN_SPOT_BTC_USD");
        let geminiBtc = await sdk.orderbooks_current_data_symbol("GEMINI_SPOT_BTC_USD");
        btc.push({
            exchange: 'binance',
            ask: binanceBtc.asks[0].price,
            bid: binanceBtc.bids[0].price
        }, {
            exchange: 'coinbase',
            ask: coinbaseBtc.asks[0].price,
            bid: coinbaseBtc.bids[0].price
        }, {
            exchange: 'kraken',
            ask: krakenBtc.asks[0].price,
            bid: krakenBtc.bids[0].price
        }, {
            exchange: 'gemini',
            ask: geminiBtc.asks[0].price,
            bid: geminiBtc.bids[0].price
        });

        // eth
        let binanceEth = await sdk.orderbooks_current_data_symbol("BINANCE_SPOT_ETH_USDT");
        let coinbaseEth = await sdk.orderbooks_current_data_symbol("COINBASE_SPOT_ETH_USD");
        let krakenEth = await sdk.orderbooks_current_data_symbol("KRAKEN_SPOT_ETH_USD");
        let geminiEth = await sdk.orderbooks_current_data_symbol("GEMINI_SPOT_ETH_USD");
        eth.push({
            exchange: 'binance',
            ask: binanceEth.asks[0].price,
            bid: binanceEth.bids[0].price
        }, {
            exchange: 'coinbase',
            ask: coinbaseEth.asks[0].price,
            bid: coinbaseEth.bids[0].price
        }, {
            exchange: 'kraken',
            ask: krakenEth.asks[0].price,
            bid: krakenEth.bids[0].price
        }, {
            exchange: 'gemini',
            ask: geminiEth.asks[0].price,
            bid: geminiEth.bids[0].price
        });

        console.log(btc);
        console.log(eth);
    } catch (err) {
        console.log(err);
    }
}

/* be careful of CoinAPI daily request limit */
getPrices();

/* due to the daily request limit, test my api with static data instead */
/* please commnet out when using CoinAPI */
// btc = [
//     { exchange: 'binance', ask: 63308, bid: 63307.99 },
//     { exchange: 'coinbase', ask: 63372.27, bid: 63368.97 },
//     { exchange: 'kraken', ask: 63371, bid: 63370.9 },
//     { exchange: 'gemini', ask: 63373.03, bid: 63370.99 }
// ]
// eth = [
//     { exchange: 'binance', ask: 4500.3, bid: 4500.29 },
//     { exchange: 'coinbase', ask: 4505.25, bid: 4505.11 },
//     { exchange: 'kraken', ask: 4505, bid: 4504.99 },
//     { exchange: 'gemini', ask: 4505.62, bid: 4504.13 }
// ]

app.get('/api', (req, res) => {
    try {
        if (btc.length !== 0 && eth.length !== 0) {
            res.status(200).json({ success: true, detail: { btc: btc, eth: eth } });
        } else {
            res.status(500).json({ success: false, detail: 'daily request limit exceeded.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
