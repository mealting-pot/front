/**
 * Created by Jordan on 7/22/2015.
 */
'use strict';

import { EventEmitter } from 'events';

import { dispatcher } from '../dispatcher.js';
import { constants } from '../constants.js';

class PicturesStore extends EventEmitter {
    constructor() {
        super();

        this.pictures = {};
    }

    getPicture(pictureId) {
        return this.pictures[pictureId];
    }

    _addPicture(picture) {
        this.pictures[picture.id] = picture;
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

var picturesStore = new PicturesStore();

picturesStore.dispatchToken = dispatcher.register(function (action) {
    switch (action.actionType) {
        case constants.LOAD_PICTURE:
            picturesStore._addPicture(action.picture);
            picturesStore.emitChange();
            break;
    }
});

export { picturesStore };