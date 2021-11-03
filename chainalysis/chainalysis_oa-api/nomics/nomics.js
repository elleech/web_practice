const express = require('express');
const axios = require("axios");
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

dotenv.config();

const key = process.env.NOMICS_KEY;

axios.get("https://api.nomics.com/v1/markets?key="+key+"&exchange=binance&base=BTC,ETH&quote=BTC,ETH")
     .then(response => console.log(response.data));

axios.get("https://api.nomics.com/v1/currencies/ticker?key="+key+"&ids=BTC,ETH&interval=1h&per-page=5")
     .then(response => console.log(response.data));
