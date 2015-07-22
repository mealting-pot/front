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

        this.setMaxListeners(0);
        this.searchResults = [];
        this.meals = {};
        this.mealsPictures = {};
    }

    _setSearchResults(searchResults) {
        this.searchResults = searchResults;
    }

    _add(meal) {
        this.meals[meal.id] = meal;
    }

    _addPictures(mealId, pictures) {
        this.mealsPictures[mealId] = pictures;
    }

    getSearchResults() {
        return this.searchResults;
    }

    getMeal(id) {
        return this.meals[id];
    }

    getMealPictures(mealId) {
        return this.mealsPictures[mealId];
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

mealsStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.actionType) {
        case constants.QUERY_MEALS:
            mealsStore._setSearchResults(action.meals);
            mealsStore.emitChange();
            break;
        case constants.LOAD_MEAL:
            mealsStore._add(action.meal);
            mealsStore.emitChange();
            break;
        case constants.LOAD_MEAL_PICTURES:
            mealsStore._addPictures(action.mealId, action.pictures);
            mealsStore.emitChange();
            break;
        case constants.POST_MEAL:
            mealsStore._add(action.meal);
            mealsStore.emitChange();
            break;
        default :
    }
});

export { mealsStore };