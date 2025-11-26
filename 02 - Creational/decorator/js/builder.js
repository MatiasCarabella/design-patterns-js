// Product class
class Car {
    constructor() {
        this.model = '';
        this.color = '';
        this.engine = '';
        this.features = [];
    }

    getDescription() {
        let desc = `${this.color} ${this.model} with ${this.engine} engine`;
        if (this.features.length > 0) {
            desc += ` and ${this.features.join(', ')}`;
        }
        return desc;
    }
}

// Builder class
class CarBuilder {
    constructor() {
        this.car = new Car();
    }

    setModel(model) {
        this.car.model = model;
        return this; // Return this for method chaining
    }

    setColor(color) {
        this.car.color = color;
        return this;
    }

    setEngine(engine) {
        this.car.engine = engine;
        return this;
    }

    addFeature(feature) {
        this.car.features.push(feature);
        return this;
    }

    build() {
        return this.car;
    }
}

function buildCar() {
    const builder = new CarBuilder();

    // Get values from form
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const engine = document.getElementById('engine').value;

    // Build the car using method chaining
    builder
        .setModel(model)
        .setColor(color)
        .setEngine(engine);

    // Add optional features
    if (document.getElementById('gps').checked) {
        builder.addFeature('GPS Navigation');
    }
    if (document.getElementById('sunroof').checked) {
        builder.addFeature('Sunroof');
    }
    if (document.getElementById('leather').checked) {
        builder.addFeature('Leather Seats');
    }

    // Build the final car
    const car = builder.build();

    // Update UI
    document.getElementById('carName').textContent = car.getDescription();
    
    const specsDiv = document.getElementById('carSpecs');
    specsDiv.innerHTML = `
        <div class="spec-item">
            <span class="spec-label">Model:</span>
            <span class="spec-value">${car.model}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Color:</span>
            <span class="spec-value">${car.color}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Engine:</span>
            <span class="spec-value">${car.engine}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Features:</span>
            <span class="spec-value">${car.features.length > 0 ? car.features.join(', ') : 'None'}</span>
        </div>
    `;

    console.log('Built car:', car);
}