// Implementation (Device interface)
class Device {
    isEnabled() {}
    enable() {}
    disable() {}
    getVolume() {}
    setVolume(percent) {}
}

// Concrete Implementations
class TV extends Device {
    constructor() {
        super();
        this.on = false;
        this.volume = 50;
    }

    isEnabled() {
        return this.on;
    }

    enable() {
        this.on = true;
        return "📺 TV is now ON";
    }

    disable() {
        this.on = false;
        return "📺 TV is now OFF";
    }

    getVolume() {
        return this.volume;
    }

    setVolume(percent) {
        this.volume = Math.max(0, Math.min(100, percent));
        return `📺 TV volume set to ${this.volume}%`;
    }
}

class Radio extends Device {
    constructor() {
        super();
        this.on = false;
        this.volume = 30;
    }

    isEnabled() {
        return this.on;
    }

    enable() {
        this.on = true;
        return "📻 Radio is now ON";
    }

    disable() {
        this.on = false;
        return "📻 Radio is now OFF";
    }

    getVolume() {
        return this.volume;
    }

    setVolume(percent) {
        this.volume = Math.max(0, Math.min(100, percent));
        return `📻 Radio volume set to ${this.volume}%`;
    }
}

class SmartSpeaker extends Device {
    constructor() {
        super();
        this.on = false;
        this.volume = 70;
    }

    isEnabled() {
        return this.on;
    }

    enable() {
        this.on = true;
        return "🔊 Smart Speaker is now ON";
    }

    disable() {
        this.on = false;
        return "🔊 Smart Speaker is now OFF";
    }

    getVolume() {
        return this.volume;
    }

    setVolume(percent) {
        this.volume = Math.max(0, Math.min(100, percent));
        return `🔊 Smart Speaker volume set to ${this.volume}%`;
    }
}

// Abstraction (Remote Control)
class RemoteControl {
    constructor(device) {
        this.device = device;
    }

    togglePower() {
        if (this.device.isEnabled()) {
            return this.device.disable();
        } else {
            return this.device.enable();
        }
    }

    volumeUp() {
        const currentVolume = this.device.getVolume();
        return this.device.setVolume(currentVolume + 10);
    }

    volumeDown() {
        const currentVolume = this.device.getVolume();
        return this.device.setVolume(currentVolume - 10);
    }
}

// Initialize
let currentDevice = new TV();
let remote = new RemoteControl(currentDevice);

function logOutput(message) {
    const outputDiv = document.getElementById('output');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    outputDiv.insertBefore(entry, outputDiv.firstChild);
    console.log(message);
}

function selectDevice(deviceType) {
    // Update button states
    document.querySelectorAll('.device-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Create new device
    switch(deviceType) {
        case 'tv':
            currentDevice = new TV();
            logOutput('Switched to Television');
            break;
        case 'radio':
            currentDevice = new Radio();
            logOutput('Switched to Radio');
            break;
        case 'speaker':
            currentDevice = new SmartSpeaker();
            logOutput('Switched to Smart Speaker');
            break;
    }

    // Update remote with new device
    remote = new RemoteControl(currentDevice);
}

function powerOn() {
    if (!currentDevice.isEnabled()) {
        const message = remote.togglePower();
        logOutput(message);
    } else {
        logOutput('Device is already ON');
    }
}

function powerOff() {
    if (currentDevice.isEnabled()) {
        const message = remote.togglePower();
        logOutput(message);
    } else {
        logOutput('Device is already OFF');
    }
}

function volumeUp() {
    if (currentDevice.isEnabled()) {
        const message = remote.volumeUp();
        logOutput(message);
    } else {
        logOutput('Please turn on the device first');
    }
}

function volumeDown() {
    if (currentDevice.isEnabled()) {
        const message = remote.volumeDown();
        logOutput(message);
    } else {
        logOutput('Please turn on the device first');
    }
}

// Initialize display
document.addEventListener('DOMContentLoaded', function() {
    logOutput('Bridge Pattern Demo Ready');
    logOutput('Current device: Television');
});
