/* ARUNX — Stock Market Data */
const Stocks = {
  mockData: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.52, change: 2.35, changePercent: 1.33 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.18, change: -0.85, changePercent: -0.59 },
    { symbol: 'MSFT', name: 'Microsoft', price: 410.23, change: 3.67, changePercent: 0.90 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.18, change: -2.14, changePercent: -0.87 },
    { symbol: 'AMZN', name: 'Amazon', price: 178.32, change: 1.92, changePercent: 1.09 }
  ],
  
  getStocks() {
    return this.mockData;
  },
  
  addToWatchlist(symbol) {
    const watchlist = Utils.Storage.get('watchlist', []);
    if (!watchlist.includes(symbol)) {
      watchlist.push(symbol);
      Utils.Storage.set('watchlist', watchlist);
      Utils.Toast.success('Added to watchlist!');
    }
  }
};

window.Stocks = Stocks;