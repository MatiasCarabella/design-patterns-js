// Component interface
class Coffee {
    cost() {
        return 0;
    }
    
    description() {
        return "Unknown Coffee";
    }
}

// Concrete Components
class Espresso extends Coffee {
    cost() {
        return 2.00;
    }
    
    description() {
        return "Espresso";
    }
}

class DecafCoffee extends Coffee {
    cost() {
        return 1.50;
    }
    
    description() {
        return "Decaf Coffee";
    }
}

class Latte extends Coffee {
    cost() {
        return 3.00;
    }
    
    description() {
        return "Latte";
    }
}

// Decorator base class
class CoffeeDecorator extends Coffee {
    constructor(coffee) {
        super();
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost();
    }
    
    description() {
        return this.coffee.description();
    }
}

// Concrete Decorators
class Milk extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 0.50;
    }
    
    description() {
        return this.coffee.description() + ", Milk";
    }
}

class Sugar extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 0.25;
    }
    
    description() {
        return this.coffee.description() + ", Sugar";
    }
}

class WhippedCream extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 0.75;
    }
    
    description() {
        return this.coffee.description() + ", Whipped Cream";
    }
}

class Caramel extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 1.00;
    }
    
    description() {
        return this.coffee.description() + ", Caramel";
    }
}

class Vanilla extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 0.80;
    }
    
    description() {
        return this.coffee.description() + ", Vanilla";
    }
}

function orderCoffee() {
    // Get base coffee
    const baseType = document.getElementById('baseCoffee').value;
    let coffee;
    
    switch(baseType) {
        case 'espresso':
            coffee = new Espresso();
            break;
        case 'decaf':
            coffee = new DecafCoffee();
            break;
        case 'latte':
            coffee = new Latte();
            break;
        default:
            coffee = new Espresso();
    }
    
    const baseCost = coffee.cost();
    let decoratorCost = 0;
    
    // Apply decorators based on checkboxes
    if (document.getElementById('milk').checked) {
        coffee = new Milk(coffee);
        decoratorCost += 0.50;
    }
    if (document.getElementById('sugar').checked) {
        coffee = new Sugar(coffee);
        decoratorCost += 0.25;
    }
    if (document.getElementById('whip').checked) {
        coffee = new WhippedCream(coffee);
        decoratorCost += 0.75;
    }
    if (document.getElementById('caramel').checked) {
        coffee = new Caramel(coffee);
        decoratorCost += 1.00;
    }
    if (document.getElementById('vanilla').checked) {
        coffee = new Vanilla(coffee);
        decoratorCost += 0.80;
    }
    
    // Update UI
    document.getElementById('coffeeName').textContent = coffee.description();
    
    const detailsDiv = document.getElementById('coffeeDetails');
    detailsDiv.innerHTML = `
        <div class="detail-item">
            <span>Base Coffee:</span>
            <span>$${baseCost.toFixed(2)}</span>
        </div>
        <div class="detail-item">
            <span>Add-ons:</span>
            <span>$${decoratorCost.toFixed(2)}</span>
        </div>
        <div class="detail-item">
            <span>Total:</span>
            <span>$${coffee.cost().toFixed(2)}</span>
        </div>
    `;
    
    console.log(`Order: ${coffee.description()} - $${coffee.cost().toFixed(2)}`);
}
