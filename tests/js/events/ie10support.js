/**
 @license
 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function (global) {

    /**
     Schedules |dispatchCallback| to be called in the future.
     @param {MutationObserver} observer
     */
    var JsMutationObserver, MutationRecord, Registration, clearRecords, copyMutationRecord, currentRecord, dispatchCallbacks, forEachAncestorAndObserverEnqueueRecord, getRecord, getRecordWithOldValue, isScheduled, recordRepresentsCurrentMutation, recordWithOldValue, registrationsTable, removeTransientObserversFor, scheduleCallback, scheduledObservers, selectRecord, sentinel, setImmediate, setImmediateQueue, uidCounter, wrapIfNeeded;
    scheduleCallback = function (observer) {
        var isScheduled;
        scheduledObservers.push(observer);
        if (!isScheduled) {
            isScheduled = true;
            setImmediate(dispatchCallbacks);
        }
    };
    wrapIfNeeded = function (node) {
        return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
    };
    dispatchCallbacks = function () {
        var anyNonEmpty, isScheduled, observers, scheduledObservers;
        isScheduled = false;
        observers = scheduledObservers;
        scheduledObservers = [];
        observers.sort(function (o1, o2) {
            return o1.uid_ - o2.uid_;
        });
        anyNonEmpty = false;
        observers.forEach(function (observer) {
            var queue;
            queue = observer.takeRecords();
            removeTransientObserversFor(observer);
            if (queue.length) {
                observer.callback_(queue, observer);
                anyNonEmpty = true;
            }
        });
        if (anyNonEmpty) {
            dispatchCallbacks();
        }
    };
    removeTransientObserversFor = function (observer) {
        observer.nodes_.forEach(function (node) {
            var registrations;
            registrations = registrationsTable.get(node);
            if (!registrations) {
                return;
            }
            registrations.forEach(function (registration) {
                if (registration.observer === observer) {
                    registration.removeTransientObservers();
                }
            });
        });
    };

    /**
     This function is used for the "For each registered observer observer (with
     observer's options as options) in target's list of registered observers,
     run these substeps:" and the "For each ancestor ancestor of target, and for
     each registered observer observer (with options options) in ancestor's list
     of registered observers, run these substeps:" part of the algorithms. The
     |options.subtree| is checked to ensure that the callback is called
     correctly.
     
     @param {Node} target
     @param {function(MutationObserverInit):MutationRecord} callback
     */
    forEachAncestorAndObserverEnqueueRecord = function (target, callback) {
        var j, node, options, record, registration, registrations;
        node = target;
        while (node) {
            registrations = registrationsTable.get(node);
            if (registrations) {
                j = 0;
                while (j < registrations.length) {
                    registration = registrations[j];
                    options = registration.options;
                    if (node !== target && !options.subtree) {
                        j++;
                        continue;
                    }
                    record = callback(options);
                    if (record) {
                        registration.enqueue(record);
                    }
                    j++;
                }
            }
            node = node.parentNode;
        }
    };

    /**
     The class that maps to the DOM MutationObserver interface.
     @param {Function} callback.
     @constructor
     */
    JsMutationObserver = function (callback) {
        this.callback_ = callback;
        this.nodes_ = [];
        this.records_ = [];
        this.uid_ = ++uidCounter;
    };

    /**
     @param {string} type
     @param {Node} target
     @constructor
     */
    MutationRecord = function (type, target) {
        this.type = type;
        this.target = target;
        this.addedNodes = [];
        this.removedNodes = [];
        this.previousSibling = null;
        this.nextSibling = null;
        this.attributeName = null;
        this.attributeNamespace = null;
        this.oldValue = null;
    };
    copyMutationRecord = function (original) {
        var record;
        record = new MutationRecord(original.type, original.target);
        record.addedNodes = original.addedNodes.slice();
        record.removedNodes = original.removedNodes.slice();
        record.previousSibling = original.previousSibling;
        record.nextSibling = original.nextSibling;
        record.attributeName = original.attributeName;
        record.attributeNamespace = original.attributeNamespace;
        record.oldValue = original.oldValue;
        return record;
    };

    /**
     Creates a record without |oldValue| and caches it as |currentRecord| for
     later use.
     @param {string} oldValue
     @return {MutationRecord}
     */
    getRecord = function (type, target) {
        var currentRecord;
        return currentRecord = new MutationRecord(type, target);
    };

    /**
     Gets or creates a record with |oldValue| based in the |currentRecord|
     @param {string} oldValue
     @return {MutationRecord}
     */
    getRecordWithOldValue = function (oldValue) {
        var recordWithOldValue;
        if (recordWithOldValue) {
            return recordWithOldValue;
        }
        recordWithOldValue = copyMutationRecord(currentRecord);
        recordWithOldValue.oldValue = oldValue;
        return recordWithOldValue;
    };
    clearRecords = function () {
        var currentRecord, recordWithOldValue;
        currentRecord = recordWithOldValue = undefined;
    };

    /**
     @param {MutationRecord} record
     @return {boolean} Whether the record represents a record from the current
     mutation event.
     */
    recordRepresentsCurrentMutation = function (record) {
        return record === recordWithOldValue || record === currentRecord;
    };

    /**
     Selects which record, if any, to replace the last record in the queue.
     This returns |null| if no record should be replaced.
     
     @param {MutationRecord} lastRecord
     @param {MutationRecord} newRecord
     @param {MutationRecord}
     */
    selectRecord = function (lastRecord, newRecord) {
        if (lastRecord === newRecord) {
            return lastRecord;
        }
        if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) {
            return recordWithOldValue;
        }
        return null;
    };

    /**
     Class used to represent a registered observer.
     @param {MutationObserver} observer
     @param {Node} target
     @param {MutationObserverInit} options
     @constructor
     */
    Registration = function (observer, target, options) {
        this.observer = observer;
        this.target = target;
        this.options = options;
        this.transientObservedNodes = [];
    };
    registrationsTable = new WeakMap();
    setImmediate = void 0;
    if (/Trident|Edge/.test(navigator.userAgent)) {
        setImmediate = setTimeout;
    } else if (window.setImmediate) {
        setImmediate = window.setImmediate;
    } else {
        setImmediateQueue = [];
        sentinel = String(Math.random());
        window.addEventListener("message", function (e) {
            var queue;
            if (e.data === sentinel) {
                queue = setImmediateQueue;
                setImmediateQueue = [];
                queue.forEach(function (func) {
                    func();
                });
            }
        });
        setImmediate = function (func) {
            setImmediateQueue.push(func);
            window.postMessage(sentinel, "*");
        };
    }
    isScheduled = false;
    scheduledObservers = [];
    uidCounter = 0;
    JsMutationObserver.prototype = {
        observe: function (target, options) {
            var i, registration, registrations;
            target = wrapIfNeeded(target);
            if (!options.childList && !options.attributes && !options.characterData || options.attributeOldValue && !options.attributes || options.attributeFilter && options.attributeFilter.length && !options.attributes || options.characterDataOldValue && !options.characterData) {
                throw new SyntaxError();
            }
            registrations = registrationsTable.get(target);
            if (!registrations) {
                registrationsTable.set(target, registrations = []);
            }
            registration = void 0;
            i = 0;
            while (i < registrations.length) {
                if (registrations[i].observer === this) {
                    registration = registrations[i];
                    registration.removeListeners();
                    registration.options = options;
                    break;
                }
                i++;
            }
            if (!registration) {
                registration = new Registration(this, target, options);
                registrations.push(registration);
                this.nodes_.push(target);
            }
            registration.addListeners();
        },
        disconnect: function () {
            this.nodes_.forEach((function (node) {
                var i, registration, registrations;
                registrations = registrationsTable.get(node);
                i = 0;
                while (i < registrations.length) {
                    registration = registrations[i];
                    if (registration.observer === this) {
                        registration.removeListeners();
                        registrations.splice(i, 1);
                        break;
                    }
                    i++;
                }
            }), this);
            this.records_ = [];
        },
        takeRecords: function () {
            var copyOfRecords;
            copyOfRecords = this.records_;
            this.records_ = [];
            return copyOfRecords;
        }
    };
    currentRecord = void 0;
    recordWithOldValue = void 0;
    Registration.prototype = {
        enqueue: function (record) {
            var lastRecord, length, recordToReplaceLast, records;
            records = this.observer.records_;
            length = records.length;
            if (records.length > 0) {
                lastRecord = records[length - 1];
                recordToReplaceLast = selectRecord(lastRecord, record);
                if (recordToReplaceLast) {
                    records[length - 1] = recordToReplaceLast;
                    return;
                }
            } else {
                scheduleCallback(this.observer);
            }
            records[length] = record;
        },
        addListeners: function () {
            this.addListeners_(this.target);
        },
        addListeners_: function (node) {
            var options;
            options = this.options;
            if (options.attributes) {
                node.addEventListener("DOMAttrModified", this, true);
            }
            if (options.characterData) {
                node.addEventListener("DOMCharacterDataModified", this, true);
            }
            if (options.childList) {
                node.addEventListener("DOMNodeInserted", this, true);
            }
            if (options.childList || options.subtree) {
                node.addEventListener("DOMNodeRemoved", this, true);
            }
        },
        removeListeners: function () {
            this.removeListeners_(this.target);
        },
        removeListeners_: function (node) {
            var options;
            options = this.options;
            if (options.attributes) {
                node.removeEventListener("DOMAttrModified", this, true);
            }
            if (options.characterData) {
                node.removeEventListener("DOMCharacterDataModified", this, true);
            }
            if (options.childList) {
                node.removeEventListener("DOMNodeInserted", this, true);
            }
            if (options.childList || options.subtree) {
                node.removeEventListener("DOMNodeRemoved", this, true);
            }
        },

        /**
         Adds a transient observer on node. The transient observer gets removed
         next time we deliver the change records.
         @param {Node} node
         */
        addTransientObserver: function (node) {
            var registrations;
            if (node === this.target) {
                return;
            }
            this.addListeners_(node);
            this.transientObservedNodes.push(node);
            registrations = registrationsTable.get(node);
            if (!registrations) {
                registrationsTable.set(node, registrations = []);
            }
            registrations.push(this);
        },
        removeTransientObservers: function () {
            var transientObservedNodes;
            transientObservedNodes = this.transientObservedNodes;
            this.transientObservedNodes = [];
            transientObservedNodes.forEach((function (node) {
                var i, registrations;
                this.removeListeners_(node);
                registrations = registrationsTable.get(node);
                i = 0;
                while (i < registrations.length) {
                    if (registrations[i] === this) {
                        registrations.splice(i, 1);
                        break;
                    }
                    i++;
                }
            }), this);
        },
        handleEvent: function (e) {
            var addedNodes, changedNode, name, namespace, nextSibling, oldValue, previousSibling, record, removedNodes, target;
            e.stopImmediatePropagation();
            switch (e.type) {
            case "DOMAttrModified":
                name = e.attrName;
                namespace = e.relatedNode.namespaceURI;
                target = e.target;
                record = new getRecord("attributes", target);
                record.attributeName = name;
                record.attributeNamespace = namespace;
                oldValue = (e.attrChange === MutationEvent.ADDITION ? null : e.prevValue);
                forEachAncestorAndObserverEnqueueRecord(target, function (options) {
                    if (!options.attributes) {
                        return;
                    }
                    if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1) {
                        return;
                    }
                    if (options.attributeOldValue) {
                        return getRecordWithOldValue(oldValue);
                    }
                    return record;
                });
                break;
            case "DOMCharacterDataModified":
                target = e.target;
                record = getRecord("characterData", target);
                oldValue = e.prevValue;
                forEachAncestorAndObserverEnqueueRecord(target, function (options) {
                    if (!options.characterData) {
                        return;
                    }
                    if (options.characterDataOldValue) {
                        return getRecordWithOldValue(oldValue);
                    }
                    return record;
                });
                break;
            case "DOMNodeRemoved":
                this.addTransientObserver(e.target);
                break;
            case "DOMNodeInserted":
                target = e.relatedNode;
                changedNode = e.target;
                addedNodes = void 0;
                removedNodes = void 0;
                if (e.type === "DOMNodeInserted") {
                    addedNodes = [changedNode];
                    removedNodes = [];
                } else {
                    addedNodes = [];
                    removedNodes = [changedNode];
                }
                previousSibling = changedNode.previousSibling;
                nextSibling = changedNode.nextSibling;
                record = getRecord("childList", target);
                record.addedNodes = addedNodes;
                record.removedNodes = removedNodes;
                record.previousSibling = previousSibling;
                record.nextSibling = nextSibling;
                forEachAncestorAndObserverEnqueueRecord(target, function (options) {
                    if (!options.childList) {
                        return;
                    }
                    return record;
                });
            }
            clearRecords();
        }
    };
    global.JsMutationObserver = JsMutationObserver;
    if (!global.MutationObserver) {
        global.MutationObserver = JsMutationObserver;
    }
})(this);