/**
 * Created by Jordan on 19/07/2015.
 */
'use strict';

import { EventEmitter } from 'events';

import { constants }    from '../constants.js';
import { dispatcher }   from '../dispatcher.js';

class MealsStore extends EventEmitter {

    constructor() {
        super();
        this.meals = [];
        this.postState = null;
    }

    _load(datas) {
        this.meals = datas;
    }

    _add(meal) {
        this.meals.push(meal);
    }

    getAll() {
        return this.meals;
    }

    getPostState() {
        return this.postState;
    }

    _setPostState(state) {
        this.postState = state;
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

var mealsStore = new MealsStore();

dispatcher.register(function (action) {
    switch (action.actionType) {
        case constants.LOAD_MEALS:
            mealsStore._load(action.meals);
            mealsStore.emitChange();
            break;
        case constants.POST_MEAL:
            mealsStore._setPostState(constants.API_FINISHED);
            mealsStore._add(action.meal);
            mealsStore.emitChange();
            break;
        case constants.RESET_POST_MEAL:
            mealsStore._setPostState(null);
            mealsStore.emitChange();
            break;
        default :
    }
});

export { mealsStore };