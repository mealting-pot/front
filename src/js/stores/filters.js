/**
 * Created by Jordan on 7/22/2015.
 */
'use strict';

import { EventEmitter } from 'events';

import { constants }    from '../constants.js';
import { dispatcher }   from '../dispatcher.js';

class FiltersStore extends EventEmitter {

    constructor() {
        super();
        this.filters = {};
    }

    _updateFilters(filters) {
        this.filters = filters;
    }

    getFilters() {
        return this.filters
    }
}

var filtersStore = new FiltersStore();

filtersStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.actionType) {
        case constants.UPDATE_FILTERS:
            filtersStore._updateFilters(action.filters);
            filtersStore.emitChange();
            break;
        default :
    }
});

export { filtersStore };