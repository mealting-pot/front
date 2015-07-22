/**
 * Created by Jordan on 7/22/2015.
 */
'use strict';

import { EventEmitter } from 'events';

import { dispatcher } from '../dispatcher.js';
import { constants } from '../constants.js';

class UsersStore extends EventEmitter {

    constructor() {
        super();
        this.users = {};
    }

    _addUser(user) {
        this.users[user.id] = user;
    }

    getUser(id) {
        return this.users[id];
    }

    emitChange() {
        this.emit('change');
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

}

var usersStore = new UsersStore();

usersStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.actionType) {
        case constants.LOAD_USER:
            usersStore._addUser(action.user);
            usersStore.emitChange();
            break;
    }
});

export { usersStore };