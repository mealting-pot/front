/**
 * Created by Jordan on 7/22/2015.
 */
'use strict';

import { default as request } from 'browser-request';

import { dispatcher }   from '../dispatcher.js';
import { constants }    from '../constants.js';

export var usersActions = {
    loadUser: function (userId) {
        request({
            uri: constants.APP_URL + '/users/' + userId,
            json: true
        }, function (err, res, body) {
            dispatcher.dispatch({
                actionType: constants.LOAD_USER,
                user: body
            });
        });
    }
};