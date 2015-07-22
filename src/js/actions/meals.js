/**
 * Created by Jordan on 19/07/2015.
 */

import { default as request } from 'browser-request';

import { loginStore } from '../stores/login.js';
import { dispatcher }   from '../dispatcher.js';
import { constants }    from '../constants.js';

export var mealsActions = {
    queryMeals: function (filters) {
        request({
            uri: 'http://localhost:9999/meals',
            json: true
        }, function (err, res, body) {
            dispatcher.dispatch({
                actionType: constants.QUERY_MEALS,
                meals: body || []
            });
        });
    },
    loadMeal: function (mealId) {
        request({
            uri: constants.APP_URL + '/meals/' + mealId,
            json: true
        }, function (err, res, body) {
            dispatcher.dispatch({
                actionType: constants.LOAD_MEAL,
                meal: body
            });
        });
    },
    loadPictures: function (mealId) {
        request({
            uri: constants.APP_URL + '/meals/' + mealId + '/pictures',
            json: true
        }, function (err, res, body) {
            dispatcher.dispatch({
                actionType: constants.LOAD_MEAL_PICTURES,
                pictures: body,
                mealId: mealId
            })
        });
    },
    postMeal: function (meal, files) {
        request({
            uri: constants.APP_URL + '/meals',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + loginStore.getToken()
            },
            body: meal,
            json: true
        }, function (err, res, body) {
            if (files.length > 0) {
                request({
                    uri: constants.APP_URL + '/meals/' + body.id + '/pictures',
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + loginStore.getToken()
                    },
                    body: {
                        name: files[0].name,
                        type: files[0].type
                    },
                    json: true
                }, function (err, res, body) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("PUT", body.aws.signed_request);
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            console.log('FUCK');
                        }
                    };
                    xhr.onerror = function() {
                        alert("Could not upload file.");
                    };
                    xhr.send(files[0]);
                });
            } else {
                dispatcher.dispatch({
                    actionType: constants.POST_MEAL,
                    meal: body
                });
            }
        });
    }
};