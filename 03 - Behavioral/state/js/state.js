// State interface
class TrafficLightState {
    constructor(light) {
        this.light = light;
    }
    
    change() {
        throw new Error("change() must be implemented");
    }
}

// Concrete States
class RedState extends TrafficLightState {
    change() {
        console.log("Red → Yellow");
        this.light.setState(this.light.yellowState);
        this.light.updateUI("Yellow", "PREPARE TO GO", "yellowLight");
    }
}

class YellowState extends TrafficLightState {
    change() {
        console.log("Yellow → Green");
        this.light.setState(this.light.greenState);
        this.light.updateUI("Green", "GO", "greenLight");
    }
}

class GreenState extends TrafficLightState {
    change() {
        console.log("Green → Red");
        this.light.setState(this.light.redState);
        this.light.updateUI("Red", "STOP", "redLight");
    }
}

// Context
class TrafficLight {
    constructor() {
        this.redState = new RedState(this);
        this.yellowState = new YellowState(this);
        this.greenState = new GreenState(this);
        
        // Start with red
        this.currentState = this.redState;
        this.updateUI("Red", "STOP", "redLight");
    }
    
    setState(state) {
        this.currentState = state;
    }
    
    change() {
        this.currentState.change();
    }
    
    updateUI(color, message, lightId) {
        // Remove all active classes
        document.querySelectorAll('.light').forEach(light => {
            light.classList.remove('active');
        });
        
        // Activate current light
        document.getElementById(lightId).classList.add('active');
        
        // Update state info
        document.getElementById('stateInfo').textContent = `Current State: ${color} - ${message}`;
    }
}

// Create traffic light instance
const trafficLight = new TrafficLight();

function changeState() {
    trafficLight.change();
}