const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  pingInterval: 10000, // saniye cinsinden
  pingTimeout: 5000, // saniye cinsinden
});
const currencies = [
  'USD',
  'EUR',
  'AUD',
  'DKK',
  'GBP',
  'CHF',
  'SEK',
  'JPY',
  'CAD',
  'NOK',
  'SAR',
  'TL'
];
const getCurrency = () => {
  const currencyRates = {};
  currencies.forEach((currency) => {
    let buy = 0;
    switch (currency) {
      case 'USD':
        buy = Math.random() * 3 + 17;
        break;
      case 'EUR':
        buy = Math.random() * 3 + 18;
        break;
      case 'AUD':
        buy = Math.random() * 3 + 11;
        break;
      case 'DKK':
        buy = Math.random() * 3 + 1.5;
        break;
      case 'GBP':
        buy = Math.random() * 3 + 21;
        break;
      case 'CHF':
        buy = Math.random() * 3 + 19;
        break;
      case 'SEK':
        buy = Math.random() * 3 + 0.9;
        break;
      case 'JPY':
        buy = Math.random() * 3 + 0.2;
        break;
      case 'CAD':
        buy = Math.random() * 3 + 12;
        break;
      case 'NOK':
        buy = Math.random() * 3 + 1;
        break;
      case 'SAR':
        buy = Math.random() * 3 + 4;
        break;
      default:
        buy = 1;
        break;
    }
    // Add a random percentage difference between 0% and 5% to the buy price to get the sell price
    const sell = parseFloat(buy) * (1.05);
    currencyRates[currency] = { buy: buy, sell: sell };
  });
  currencyRates["TL"] = { buy: 1, sell: 1 }
  return currencyRates;
};
const today = new Date().toISOString().substring(0, 10);
let values = {
  [today]: getCurrency()
};
setInterval(() => {
  values[today] = getCurrency();
}, 8000);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
  console.log('Client connected.');
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
  const sendExchangeMessage = (result, room) => {
    io.to(room).emit('exchange', result);
  };
  socket.on('exchange', (data) => {
    const baseCurrency = data.base || 'USD';
    const targetCurrency = data.target || 'EUR';
    const date = data.date || new Date().toISOString().substring(0, 10);
    if (!currencies.includes(baseCurrency) || !currencies.includes(targetCurrency)) {
      return socket.emit('exchange', 'Invalid currency.');
    }
    let result, buy, sell;
    if (values[date] == null) {
      values[date] = getCurrency();
    }
    buy = values[date][baseCurrency].buy / values[date][targetCurrency].buy;
    if (targetCurrency == "TL") {
      sell = (values[date][baseCurrency].sell / values[date][targetCurrency].sell);
    }
    else {
      sell = (values[date][baseCurrency].sell / values[date][targetCurrency].buy);
    }
    result = `${baseCurrency}.${targetCurrency}|${buy}|${sell}|${date}`
    sendExchangeMessage(result, 'room-1');
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});
http.listen(3000, () => {
  console.log('Server running on port 3000.');
});