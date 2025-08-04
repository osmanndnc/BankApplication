const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

console.log("Mock server 3000 portunda çalışıyor...");

const currencies = ["USD", "EUR", "GBP"];

function generateRate(base) {
  switch (base) {
    case "USD":
      return Math.random() * 3 + 17;
    case "EUR":
      return Math.random() * 3 + 18;
    case "GBP":
      return Math.random() * 3 + 20;
    default:
      return 1;
  }
}

io.on("connection", (socket) => {
  console.log("Bir istemci bağlandı:", socket.id);

  socket.on("subscribe", (selectedCurrencies) => {
    console.log("İstemci şu dövizleri takip ediyor:", selectedCurrencies);

    const interval = setInterval(() => {
      const updates = selectedCurrencies.map((curr) => ({
        currency: curr,
        rate: generateRate(curr).toFixed(2),
        time: new Date().toLocaleTimeString(),
        counter:10,
      }));

      socket.emit("currency-update", updates);
    }, 10000);

    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("İstemci ayrıldı:", socket.id);
    });
  });
});
