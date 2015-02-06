/*
 * GardenJS / core / observable.js
 * copyright (c) 2015 Susisu
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        Observable  : Observable,
        Subscription: Subscription
    });
}

var ev = require("electronvolt");
var garden = {
    core: {
        events: require("./events.js")
    }
};
var ObservableEvent = garden.core.events.ObservableEvent;


function Observable(initialValue) {
    Object.defineProperties(this, {
        _value: {
            writable: true,
            value   : initialValue
        },
        _dispatcher: {
            writable: true,
            value   : new ev.EventDispatcher(this)
        }
    });
}

Observable.prototype = Object.create(Object.prototype, {
    constructor: {
        writable    : true,
        configurable: true,
        value       : Observable
    },
    value: {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this._dispatcher.dispatchEvent(new ObservableEvent(ObservableEvent.CHANGE, value));
        }
    },
    subscribe: {
        writable    : true,
        configurable: true,
        value       : function (callback) {
            var listener = function (event) {
                callback(event.value);
            };
            this._dispatcher.addEventListener(ObservableEvent.CHANGE, listener);
            return new Subscription(this, listener);
        }
    }
});


function Subscription(target, listener) {
    Object.defineProperties(this, {
        _target: {
            writable: true,
            value   : target
        },
        _listener: {
            writable: true,
            value   : listener
        }
    });
}

Subscription.prototype = Object.create(Object.prototype, {
    constructor: {
        writable    : true,
        configurable: true,
        value       : Subscription
    },
    dispose: {
        writable    : true,
        configurable: true,
        value       : function () {
            this._target._dispatcher.removeEventListener(ObservableEvent.CHANGE, this._listener);
        }
    }
});


endModule();
