// Custom console logger for the page
const consoleDiv = document.getElementById('console');
function logToPage(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    entry.textContent = message;
    consoleDiv.appendChild(entry);
    console.log(message);
}

class Logger {
    /**
     * Here, the Singleton Design Pattern is exemplified with a Logger class.
     * Naturally, if we were interested in logging our application or project,
     * we would have many different files from various places in our project
     * sending info to a Logger Object. This Logger should always be THE SAME Object,
     * the only instance of the Logger class. We can ensure this with a Singleton.
     */ 

    constructor() {
        if (Logger.instance) {
            logToPage("⚠️ Logger already exists - returning existing instance", "warning");
            return Logger.instance;
        }
        logToPage("✅ Creating new Logger instance...", "success");

        this.logs = [];
        this.instanceId = Math.random().toString(36).substr(2, 9);
        Logger.instance = this;
    }

    // The log function stores its input in the logs array 
    log(data) {
        logToPage(`📝 Logging: ${data}`, "info");
        this.logs.push(data);
    }

    // The size function returns the current size of the logs array
    size() {
        return this.logs.length;
    }

    // The show function prints all logs into the console
    show() {
        logToPage("--- All Logs ---", "info");
        this.logs.forEach(log => logToPage(`  • ${log}`, "info"));
    }

    getInstanceId() {
        return this.instanceId;
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Simulate creating logger from different files
    logToPage("=== Simulating file1.js ===", "success");
    let the_logger = new Logger();
    document.getElementById('logger1-id').textContent = `Instance ID: ${the_logger.getInstanceId()}`;
    the_logger.log('FIRST LOG from file1.js');

    logToPage("\n=== Simulating file2.js ===", "success");
    let another_logger = new Logger();
    document.getElementById('logger2-id').textContent = `Instance ID: ${another_logger.getInstanceId()}`;
    another_logger.log('SECOND LOG from file2.js');

    logToPage("\n=== Verification ===", "success");
    logToPage(`📊 Total log count: ${another_logger.size()}`, "info");
    logToPage(`🔍 Are they the same instance? ${the_logger === another_logger ? 'YES ✓' : 'NO ✗'}`, "success");
    logToPage("", "info");
    another_logger.show();

    logToPage("\n💡 Notice: Both variables reference the SAME Logger instance!", "warning");
});

