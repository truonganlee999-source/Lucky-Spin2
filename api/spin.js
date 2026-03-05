// File: api/spin.js

export default function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // HIDDEN REWARD RATES: Users cannot inspect this on the browser
    const prizes =[
        { id: 0, label: "Golden Prize", percent: 0.0000001 },
        { id: 1, label: "Silver Award", percent: 0.0000001 },
        { id: 2, label: "50% OFF",      percent: 0.0999997   },
        { id: 3, label: "20% OFF",      percent: 99.9   },
        { id: 4, label: "Gift Card",    percent: 0.0000001   }
    ];

    // Logic for Weighted Random Selection
    const total = prizes.reduce((sum, p) => sum + p.percent, 0);
    let r = Math.random() * total;
    let winnerIndex = 0;
    
    for (let i = 0; i < prizes.length; i++) {
        if (r < prizes[i].percent) {
            winnerIndex = i;
            break;
        }
        r -= prizes[i].percent;
    }

    // Return the result to the frontend
    res.status(200).json({
        winnerIndex: winnerIndex,
        prizeName: prizes[winnerIndex].label
    });
}