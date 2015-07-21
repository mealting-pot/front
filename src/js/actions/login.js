/**
 * Created by Jordan on 19/07/2015.
 */

import { default as request } from 'browser-request';
import { Base64 } from 'js-base64';

import { dispatcher }   from '../dispatcher.js';
import { constants }    from '../constants.js';

import { loginStore } from '../stores/login.js';

export var loginActions = {
    login: function (data) {
        request({
            uri: constants.APP_URL + '/jwt',
            json: true,
            headers: {
                'Authorization': 'Basic ' + Base64.encode(data.email + ':' + data.password)
            }
        }, function (err, res, body) {
            console.log(body);
            dispatcher.dispatch({
                actionType: constants.LOGIN_SUCCESS,
                token: body.access_token
            });
        });
    },
    register: function (data) {
        request({
            method: 'POST',
            uri: constants.APP_URL + '/users',
            json: true,
            body: data
        }, function (err, res, body) {
            console.log(body);
            dispatcher.dispatch({
                actionType: constants.REGISTER_SUCCESS
            });
            loginActions.login(data);
        });
    },
    logOut: function () {
        dispatcher.dispatch({
            actionType: constants.LOGOUT
        });
    },
    loadUser: function () {
        request({
            uri: constants.APP_URL + '/users/me',
            json: true,
            headers: {
                'Authorization': 'Bearer ' + loginStore.getToken()
            }
        }, function (err, res, body) {
            console.log(body);
            dispatcher.dispatch({
                actionType: constants.LOAD_USER,
                user: body
            });
        });
    }
};