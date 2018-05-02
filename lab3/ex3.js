'use strict';

const EventEmitter = require('events');

class Clock extends EventEmitter {
    constructor() {
        super();
    }

    start() {
        let self = this;
        this.interval = setInterval(function() {
            self.emit('tick');
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }
}

const clock = new Clock();

clock.on('tick', function() {
    console.log('Woohoo');
});

clock.start();

setTimeout(function(){
    clock.stop();
}, 10000);