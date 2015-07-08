/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React from 'react';
import { Card, CardHeader, CardTitle, CardMedia, FontIcon } from 'material-ui'

export class Meal extends React.Component {
    render() {

        var elementStyle = {
            marginBottom: 8
        };

        return (
            <Card style={ elementStyle }>
                <CardHeader
                    title="John Doe"
                    subtitle="Arsenal fanboy"
                    avatar="http://lorempixel.com/100/100/people/"/>
                <CardMedia overlay={<CardTitle title="Indian Curry" subtitle={<FontIcon className="material-icons place"/>}/>}>
                    <img src="http://lorempixel.com/600/337/food/"/>
                </CardMedia>
                <CardTitle title="4:00 pm - Mon. 18 March" subtitle="12€/meal"/>
            </Card>
        );

    }
}

export class Meals extends React.Component {

    constructor() {
        super();
        this.state = {
            meals: this._getMeals()
        }
    }

    _getMeals() {
        return [
            {
                "user": {
                    "name": "John Doe",
                    "bio": "Arsenal fanboy.",
                    "avatar": "http://lorempixel.com/100/100/people/"
                },
                "title": "Indian Curry"
            }, {

            }, {

            }, {

            }
        ];
    }

    render() {
        var meals = this.state.meals.map((meal, i) => <Meal meal={ meal } key={ i } />);

        return (
            <div>
                { meals }
            </div>
        );
    }
}