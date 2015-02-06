/*
 * GardenJS / core / events.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        ObservableEvent: ObservableEvent
    });
}

var ev = require("electronvolt");

function ObservableEvent(type, value) {
    ev.Event.call(this, type);
    Object.defineProperties(this, {
        value: {
            enumerable: true,
            value     : value
        }
    });
}

Object.defineProperties(ObservableEvent, {
    CHANGE: {
        enumerable: true,
        value     : "change"
    }
});

ObservableEvent.prototype = Object.create(ev.Event.prototype, {
    constructor: {
        writable    : true,
        configurable: true,
        value       : ObservableEvent
    },
    clone: {
        writable    : true,
        configurable: true,
        value       : function () {
            return new ObservableEvent(this.type, this.value);
        }
    },
    toString: {
        writable    : true,
        configurable: true,
        value       : function () {
            return this.formatToString("ObservableEvent", ["type", "value"]);
        }
    }
});


endModule();
