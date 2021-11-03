var SDK = typeof window !== 'undefined' ? window.COIN_API_SDK : require("./coinapi_v1")["default"]

var sdk = new SDK("YOUR_API_KEY_HERE")

function run() {
  var t = new Date(Date.parse("2016-11-01T22:08:41+00:00"))

  sdk.metadata_list_exchanges().then(function (exchanges) {
    console.log('exchanges:')
    console.log('number: ', exchanges.length)
    exchanges.forEach(x=> {
      if (x.name === 'Binance' || x.exchange_id === 'COINBASE' || x.name === 'Kraken' || x.name.includes() === 'Crypto' || x.name === 'Gemini') {
        console.log(x)
        // exchange_id: 'BINANCE', 'COINBASE', 'KRAKEN', 'GEMINI'
      }
    })

  });

//   sdk.metadata_list_assets().then(function (Metadata_list_assets) {
//     console.log('Metadata_list_assets:')
//     console.log('number: ', Metadata_list_assets.length)
//     Metadata_list_assets.forEach(x=> { console.log(x) })

//   });

  sdk.metadata_list_symbols().then(function (Metadata_list_symbols) {
    console.log('Metadata_list_symbols:')
    console.log('number: ', Metadata_list_symbols.length)
    Metadata_list_symbols.forEach(x=> {
      if ((x.exchange_id === 'BINANCE' || x.exchange_id === 'COINBASE' || x.exchange_id === 'KRAKEN' || x.exchange_id === 'GEMINI') && (x.asset_id_base === 'BTC' || x.asset_id_base === 'ETH') && x.asset_id_quote === 'USD') {
        console.log(x)
        // symbol_id: 'BINANCE_SPOT_BTC_USDT', 'COINBASE_SPOT_BTC_USD', 'KRAKEN_SPOT_BTC_USD', 'GEMINI_SPOT_BTC_USD'
        // symbol_id: 'BINANCE_SPOT_ETH_USDT', 'COINBASE_SPOT_ETH_USD', 'KRAKEN_SPOT_ETH_USD', 'GEMINI_SPOT_ETH_USD'
      }
    })

  });

//   sdk.exchange_rates_get_specific_rate("BTC", "USD", t).then(function (Exchange_rates_get_specific_rate) {
//     console.log('Exchange_rates_get_specific_rate:')
//     console.log(Exchange_rates_get_specific_rate) 

//   });
//   sdk.exchange_rates_get_all_current_rates("BTC").then(function (Exchange_rates_get_all_current_rates) {
//     console.log('Exchange_rates_get_all_current_rates:')
//     console.log(Exchange_rates_get_all_current_rates)
//   });
//   sdk.ohlcv_list_all_periods().then(function (Ohlcv_list_all_periods) {
//     console.log('Ohlcv_list_all_periods:')
//     console.log('number: ', Ohlcv_list_all_periods.length)
//     Ohlcv_list_all_periods.forEach(x=> { console.log(x) })

//   });
//   sdk.ohlcv_latest_data("BITSTAMP_SPOT_BTC_USD", "1MIN", 5).then(function (Ohlcv_latest_data) {
//     console.log('Ohlcv_latest_data:')
//     console.log('number: ', Ohlcv_latest_data.length)
//     Ohlcv_latest_data.forEach(x=> { console.log(x) })

//   });
//   sdk.ohlcv_historic_data("BITSTAMP_SPOT_BTC_USD", "1MIN", t, new Date(), 5).then(function (Ohlcv_historic_data) {
//     console.log('Ohlcv_historic_data:')
//     console.log('number: ', Ohlcv_historic_data.length)
//     Ohlcv_historic_data.forEach(x=> { console.log(x) })

//   });
//   sdk.trades_latest_data_all(5).then(function (Trades_latest_data_all) {
//     console.log('Trades_latest_data_all:')
//     console.log('number: ', Trades_latest_data_all.length)
//     Trades_latest_data_all.forEach(x=> { console.log(x) })

//   });
//   sdk.trades_latest_data_symbol("BITSTAMP_SPOT_BTC_USD", 5).then(function (Trades_latest_data_symbol) {
//     console.log('Trades_latest_data_symbol:')
//     console.log('number: ', Trades_latest_data_symbol.length)
//     Trades_latest_data_symbol.forEach(x=> { console.log(x) })

//   });
//   sdk.trades_historical_data("BITSTAMP_SPOT_BTC_USD", t, new Date(), 5).then(function (Trades_historical_data) {
//     console.log('Trades_historical_data:')
//     console.log('number: ', Trades_historical_data.length)
//     Trades_historical_data.forEach(x=> { console.log(x) })

//   });
//   sdk.quotes_current_data_all().then(function (Quotes_current_data_all) {
//     console.log('Quotes_current_data_all:')
//     console.log('number: ', Quotes_current_data_all.length)
//     Quotes_current_data_all.forEach(x=> { console.log(x) })

//   });
//   sdk.quotes_current_data_symbol("BITSTAMP_SPOT_BTC_USD").then(function (Quotes_current_data_symbol) {
//     console.log('Quotes_current_data_symbol:')
//       console.log(Quotes_current_data_symbol)
//   });
//   sdk.quotes_latest_data_all(5).then(function (Quotes_latest_data_all) {
//     console.log('Quotes_latest_data_all:')
//     console.log('number: ', Quotes_latest_data_all.length)
//     Quotes_latest_data_all.forEach(x=> { console.log(x) })

//   });
//   sdk.quotes_latest_data_symbol("BITSTAMP_SPOT_BTC_USD", 5).then(function (Quotes_latest_data_symbol) {
//     console.log('Quotes_latest_data_symbol:')
//     console.log('number: ', Quotes_latest_data_symbol.length)
//     Quotes_latest_data_symbol.forEach(x=> { console.log(x) })

//   });
//   sdk.quotes_historical_data("BITSTAMP_SPOT_BTC_USD", t, new Date(), 5).then(function (Quotes_historical_data) {
//     console.log('Quotes_historical_data:')
//     console.log('number: ', Quotes_historical_data.length)
//     Quotes_historical_data.forEach(x=> { console.log(x) })

//   });
//   sdk.orderbooks_current_data_all().then(function (Orderbooks_current_data_all) {
//     console.log('Orderbooks_current_data_all:')
//     console.log('number: ', Orderbooks_current_data_all.length)
//     Orderbooks_current_data_all.forEach(x=> { console.log(x) })

//   });
  sdk.orderbooks_current_data_symbol("BITSTAMP_SPOT_BTC_USD").then(function (Orderbooks_current_data_symbol) {
    console.log('Orderbooks_current_data_symbol:')
    console.log(Orderbooks_current_data_symbol) 

  });
//   sdk.orderbooks_latest_data("BITSTAMP_SPOT_BTC_USD", 5).then(function (Orderbooks_latest_data) {
//     console.log('Orderbooks_latest_data:')
//     console.log('number: ', Orderbooks_latest_data.length)
//     Orderbooks_latest_data.forEach(x=> { console.log(x) })

//   });
//   sdk.orderbooks_historical_data("BITSTAMP_SPOT_BTC_USD", t, new Date(), 5).then(function (Orderbooks_historical_data) {
//     console.log('Orderbooks_historical_data:')
//     console.log('number: ', Orderbooks_historical_data.length)
//     Orderbooks_historical_data.forEach(x=> { console.log(x) })

//   });
}

run();