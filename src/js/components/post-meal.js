/**
 * Created by Jordan on 20/07/2015.
 */
'use strict';

import React from 'react';

import { Card, TextField, CardHeader, AppBar, DatePicker, TimePicker, RaisedButton } from 'material-ui';

import { mealsActions } from '../actions/meals.js';

export class PostMealLayout extends React.Component {

    constructor() {
        super();
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit(e) {
        e.preventDefault();

        var meal = {
            title: this.refs.title.getValue(),
            date: this.refs.date.getDate(),
            location: {
                latitude: 50,
                longitude: 50
            }
        };

        console.log(meal);
        mealsActions.postMeal(meal, this.refs.picture.getDOMNode().files);
    }

    _onPictureChange() {
        console.log(arguments);
    }

    render () {
        return (
            <Card>
                <AppBar title="Post a meal" showMenuIconButton={false} zDepth={0} />
                <form onSubmit={this._onSubmit} style={{ display: '-webkit-flex', WebkitFlexDirection: 'column', flex: 1, padding: 8 }}>
                    <div style={{ WebkitFlex: 1, display: '-webkit-flex', WebkitFlexDirection: 'row' }}>
                        <TextField ref="title" style={{ WebkitFlex: 1 }} floatingLabelText="Title" />
                    </div>
                    <div style={{ WebkitFlex: 1, display: '-webkit-flex', WebkitFlexDirection: 'row' }}>
                        <TextField ref="city" style={{ WebkitFlex: 1 }} floatingLabelText="City" />
                    </div>
                    <div style={{ WebkitFlex: 1, display: '-webkit-flex', WebkitFlexDirection: 'row' }}>
                        <DatePicker ref="date" style={{ WebkitFlex: 1, display: '-webkit-flex', WebkitFlexDirection: 'row', paddingRight: 4 }} textFieldStyle={{ WebkitFlex: 1 }} floatingLabelText="Date" />
                        <div style={{ WebkitFlex: 1, paddingLeft: 4 }}>
                            <TimePicker ref="time" style={{ width: '100%' }} floatingLabelText="Time" />
                        </div>
                    </div>
                    <div style={{ WebkitFlex: 1, display: '-webkit-flex', WebkitFlexDirection: 'row' }}>
                        <div style={{ WebkitFlex: 1, paddingRight: 4, display: '-webkit-flex', WebkitFlexDirection: 'row' }}>
                            <TextField ref="price" style={{ WebkitFlex: 1 }} floatingLabelText="Price" />
                        </div>
                        <div style={{ WebkitFlex: 1, paddingLeft: 4, display: '-webkit-flex', WebkitFlexDirection: 'row' }}>
                            <TextField ref="seats" style={{ WebkitFlex: 1 }} floatingLabelText="Seats" />
                        </div>
                    </div>
                    <div style={{ WebkitFlex: 1, display: '-webkit-flex', WebkitFlexDirection: 'row' }}>
                        <input ref="picture" onChange={this._onPictureChange} type="file" style={{ WebkitFlex: 1 }} />
                    </div>
                    <div style={{ WebkitFlex: 1, display: '-webkit-flex', WebkitFlexDirection: 'row' }}>
                        <RaisedButton type="submit" style={{ WebkitFlex: 1 }} label="Submit" primary={true}  />
                    </div>
                </form>
            </Card>
        );
    }
}