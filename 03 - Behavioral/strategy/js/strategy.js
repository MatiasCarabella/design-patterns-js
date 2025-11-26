class SalesContext {
    constructor(strategy, amount) {
        this.strategy = strategy;
        this.amount = strategy.calculate(amount);
    }
}

class DiscountStrategy {
    constructor(discount, name) {
        this.discount = discount;
        this.name = name;
    }

    calculate(amount) {
        return amount * (1 - this.discount);
    }
}

// Define different discount strategies
const strategies = {
    regular: new DiscountStrategy(0.20, "Regular Sale"),
    premium: new DiscountStrategy(0.30, "Premium Member"),
    vip: new DiscountStrategy(0.50, "VIP Member")
};

function applyStrategy(strategyType, element) {
    const price = parseFloat(document.getElementById('priceInput').value) || 0;
    const strategy = strategies[strategyType];
    const sale = new SalesContext(strategy, price);
    
    // Update UI
    const resultDiv = document.getElementById('result');
    const savings = price - sale.amount;
    const discountPercent = (strategy.discount * 100).toFixed(0);
    
    resultDiv.innerHTML = `
        <div>Strategy: ${strategy.name}</div>
        <div style="font-size: 1rem; margin-top: 0.5rem;">
            Original: $${price.toFixed(2)} | 
            Discount: ${discountPercent}% | 
            Savings: $${savings.toFixed(2)}
        </div>
        <div style="font-size: 2rem; margin-top: 0.5rem;">
            Final Price: $${sale.amount.toFixed(2)}
        </div>
    `;
    resultDiv.style.display = 'block';
    
    // Update active button
    document.querySelectorAll('.strategy-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    
    console.log(`Applied ${strategy.name}: $${price} → $${sale.amount.toFixed(2)}`);
}
