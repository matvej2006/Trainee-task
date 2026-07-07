document.addEventListener("DOMContentLoaded", () => {
    const symbolMap = {
        'Bitcoin': 'btcusdt',
        'Ethereum': 'ethusdt',
        'Solana': 'solusdt',
        'XPR': 'xrpusdt', 
        'USD Coin': 'usdcusdt',
        'Binance Coin': 'bnbusdt',
        'Dogecoin': 'dogeusdt',
        'Sui': 'suiusdt',
    };

    const streams = Object.values(symbolMap).map(sym => `${sym}@ticker`).join('/');
    const wsUrl = `wss://stream.binance.com:9443/ws/${streams}`;
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.s && data.c) {
            updatePriceInDOM(data.s, parseFloat(data.c));
        }
    };

    function updatePriceInDOM(symbol, newPrice) {
        const coinName = Object.keys(symbolMap).find(key => symbolMap[key].toUpperCase() === symbol);
        if (!coinName) return;

        const items = document.querySelectorAll('.crypto-item');
        
        items.forEach(item => {
            const nameElement = item.querySelector('.name');
            const priceElement = item.querySelector('.price');
            
            if (nameElement && nameElement.textContent.trim() === coinName) {
                const oldPriceStr = priceElement.textContent.replace(/[^0-9.-]+/g, "");
                const oldPrice = parseFloat(oldPriceStr);
                const formattedPrice = formatPrice(newPrice);
                priceElement.textContent = `$${formattedPrice}`;
            }
        });
    }

    function formatPrice(price) {
        if (price >= 1000) {
            return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else if (price >= 1) {
            return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
        } else {
            return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 5 });
        }
    }

    ws.onclose = () => {
        console.log("WebSocket отключен. Переподключение...");
        setTimeout(() => new WebSocket(wsUrl), 5000);
    };
});