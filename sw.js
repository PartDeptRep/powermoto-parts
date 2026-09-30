self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('powermoto-store').then((cache) => cache.addAll([
        '/index.html',
        '/inventory.csv'
      ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
function sendOrderRequest() {
        if (cart.length === 0) return alert("Your cart is empty!");
        
        let details = 'Hello Power Motorcycles USA, order request:\n\n';
        let total = 0;
        
        cart.forEach(item => {
            const qty = item.qty || 1;
            details += `- ${qty}x P/N: ${item['Part Number']} | ${item['Description']} ($${(parseFloat(item['Price']) * qty).toFixed(2)})\n`;
            total += parseFloat(item['Price']) * qty;
        });
        
        details += `\nTotal: $${total.toFixed(2)}\n`;
        
        const encodedDetails = encodeURIComponent(details);
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Check exact device type to handle Apple vs Android SMS formatting
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(userAgent);
        
        if (isMobile) {
            // iOS requires '&body=' while Android requires '?body='
            const separator = isIOS ? '&' : '?';
            window.location.href = `sms:3212152065${separator}body=${encodedDetails}`;
        } else {
            // Desktops and laptops default to Email
            window.location.href = `mailto:nicholas@powermotorcyclesusa.com?subject=Parts%20Order%20Request&body=${encodedDetails}`;
        }
    }
