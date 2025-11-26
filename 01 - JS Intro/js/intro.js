// Custom console logger for the page
function logToPage(label, value, comment = '') {
    const consoleDiv = document.getElementById('console');
    if (!consoleDiv) return;
    
    if (comment) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-comment">// ${comment}</span>`;
        consoleDiv.appendChild(entry);
    }
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<span class="log-label">${label}:</span> <span class="log-value">${JSON.stringify(value)}</span>`;
    consoleDiv.appendChild(logEntry);
    console.log(label, value);
}

/** FIRST-CLASS FUNCTIONS
 * They can behave like variables and 
 * be parsed as arguments to higher-order functions
 */
function add(a, b) {
    return a+b
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    let result = add(1, 2)
    logToPage('add(1, 2)', result, 'FIRST-CLASS FUNCTIONS')

    const fnAdd = add
    result = fnAdd(5, 6)
    logToPage('fnAdd(5, 6)', result, 'Functions as variables')

    /** HIGHER ORDER FUNCTIONS
     * Functions that return a function 
     * or take in a function as an argument.
     */
    function operation(fn, a, b) {
        return fn(a, b)
    }

    logToPage('operation(fnAdd, 10, 20)', operation(fnAdd, 10, 20), 'HIGHER ORDER FUNCTIONS')

    /** ARROW FUNCTIONS
     * Compact alternative to a traditional function expression
     */
    logToPage('operation((a,b)=>a*b, 7, 5)', operation((a,b)=>a*b, 7, 5), 'ARROW FUNCTIONS')

    // The same functionality but multi-line requires '{}' and a return
    logToPage('Multi-line arrow function', operation((a,b)=> {
        const result = a*b
        return result
    }, 7, 5))

    // for each
    const brands = ['Toyota', 'Aston Martin', 'Ferrari']

    // Doesn't modify the original array
    logToPage('Original brands', brands, 'ARRAY METHODS - forEach')
    brands.forEach((brand) => console.log(brand.toUpperCase()))

    // Modifies the original array
    brands.sort();
    logToPage('After sort()', brands, 'Modifies original array')

    // Map - returns a new array
    const brandsUpper = brands.map((brand) => brand.toUpperCase())
    logToPage('map() result', brandsUpper, 'Returns new array')

    // Reduce
    const products = [
        {
            "name":"Jeans",
            "price":20
        },
        {
            "name":"Skirts",
            "price": 15
        }
    ]

    const total = products.reduce((sum, product) => {
        return sum + product.price
    }, 0)
    logToPage('reduce() total', total, 'REDUCE - Sum prices')

    // w/ one-line arrow function
    const total2 = products.reduce((sum, product) => sum + product.price, 0)
    logToPage('One-line reduce', total2)

    // Object Oriented Programming
    // CLASS
    class Drink {
        constructor(name) {
            this.name = name
        }

        info() {
            return "Drink name: " + this.name
        }
    }

    const water = new Drink("water")
    logToPage('water.info()', water.info(), 'OOP - CLASS')

    // Functional Programming
    function DrinkV2(name) {
        this.name = name
        this.info = function() {
            return "DrinkV2 name: " + this.name
        }
    }

    const beer = new Drink("beer")
    logToPage('beer.info()', beer.info(), 'Functional approach')

    // INHERITANCE
    class Beer extends Drink {
        constructor(name, alcohol) {
            super(name)
            this.alcohol = alcohol
        }

        info() {
            return super.info() + " | Alcohol: " + this.alcohol + "%"
        }
    }

    const budweiser = new Beer("budweiser", 4.8)
    logToPage('budweiser.info()', budweiser.info(), 'INHERITANCE - extends')
});