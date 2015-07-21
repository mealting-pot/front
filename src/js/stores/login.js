/**
 * Created by Jordan on 20/07/2015.
 */
'use strict';

import { EventEmitter } from 'events';

import { constants }    from '../constants.js';
import { dispatcher }   from '../dispatcher.js';

class LoginStore extends EventEmitter {

    constructor() {
        super();
        this.token = sessionStorage.getItem('token');
        this.user = {};
        if (this.token) {
            this.state = constants.LOGGED_IN;
        } else {
            this.state = constants.LOGGED_OUT;
        }
    }

    _login(token) {
        sessionStorage.setItem('token', token);
        this.token = token;
        this.state = constants.LOGGED_IN;
    }

    _loadUser(user) {
        this.user = user;
    }

    _logOut() {
        this.token = undefined;
        this.user = {};
        this.state = constants.LOGGED_OUT;
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.token;
    }

    getState() {
        return this.state;
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

var loginStore = new LoginStore();

dispatcher.register(function (action) {
    switch (action.actionType) {
        case constants.LOGIN_SUCCESS:
            loginStore._login(action.token);
            loginStore.emitChange();
            break;
        case constants.LOAD_USER:
            loginStore._loadUser(action.user);
            loginStore.emitChange();
            break;
        case constants.LOGOUT:
            loginStore._logOut();
            loginStore.emitChange();
        default :
    }
});

export { loginStore };