/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React from 'react';
import { Styles, Card, CardTitle, CardMedia, Paper, RaisedButton } from 'material-ui';
import { Link } from 'react-router-component';
import { CardHeader } from './material/card-header.js';
import { Rating } from './rating.js';
import moment from 'moment';

export class MealLayout extends React.Component {

    _getMeal() {
        return {
            "user": {
                "firstName": "John",
                "bio": "Arsenal fanboy.",
                "avatar": "http://lorempixel.com/100/100/people/",
                "rating": 4.4
            },
            "title": "Indian Curry",
            "city": "Woolf college",
            "date": moment(),
            "price": 12.50,
            "seats": 8,
            "pictures": ["http://lorempixel.com/600/337/food/"]
        }
    }

    constructor() {
        super();
        this._getMeal = this._getMeal.bind(this);
        this.state = {
            meal: this._getMeal()
        }
    }

    render() {
        return (
            <Card style={{ marginBottom: 8 }}>
                <CardHeader style={{ display: '-webkit-flex' }}
                            title={
                        <div style={{ display: '-webkit-flex' }}>
                            <div style={{ WebkitFlex: 1 }}>{ this.state.meal.user.firstName }</div>
                            <Rating score={ this.state.meal.user.rating } />
                        </div>
                    }
                            subtitle={ this.state.meal.user.bio }
                            avatar={ this.state.meal.user.avatar }/>
                <CardMedia overlay={<CardTitle title={ this.state.meal.title } />}>
                    <img src={this.state.meal.pictures[0]}/>
                </CardMedia>
                <div style={{ display: '-webkit-flex', textAlign: 'center', padding: 8 }}>
                    <div style={{ WebkitFlex: 1, marginRight: 4, display: '-webkit-flex', WebkitFlexDirection: 'column', textAlign: 'center' }}><i style={{ WebkitFlex: 1 }} className="material-icons" >place</i><span style={{ WebkitFlex: 1 }} >{ this.state.meal.city }</span></div>
                    <div style={{ WebkitFlex: 1, marginRight: 4, display: '-webkit-flex', WebkitFlexDirection: 'column', textAlign: 'center' }}><i style={{ WebkitFlex: 1 }} className="material-icons" >today</i><span style={{ WebkitFlex: 1 }} >{ this.state.meal.date.format('ddd. D/M') }</span></div>
                </div>
                <div style={{ display: '-webkit-flex', textAlign: 'center', padding: 8 }}>
                    <div style={{ WebkitFlex: 1, marginRight: 4, display: '-webkit-flex', WebkitFlexDirection: 'column', textAlign: 'center' }}><i style={{ WebkitFlex: 1 }} className="material-icons" >people</i><span style={{ WebkitFlex: 1 }} >{ this.state.meal.seats + ' remaining seats' }</span></div>
                    <div style={{ WebkitFlex: 1, marginRight: 4, display: '-webkit-flex', WebkitFlexDirection: 'column', textAlign: 'center' }}><i style={{ WebkitFlex: 1 }} className="material-icons" >credit_card</i><span style={{ WebkitFlex: 1 }} >{ `£${this.state.meal.price} per meal` }</span></div>
                </div>
                <iframe
                    frameborder="0" style={{ border: 0, width: '100%' }}
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCdOs-81w4jMEDaw0QWfTnzrCkJiL0nptQ
    &q=Space+Needle,Seattle+WA" allowfullscreen>
                </iframe>
                <div style={{ display: '-webkit-flex', textAlign: 'center', padding: 8 }}>
                    <div style={{ WebkitFlex: 1, marginRight: 4, display: '-webkit-flex' }}><RaisedButton style={{ WebkitFlex: 1 }} label="Remind me" secondary={true} /></div>
                    <div style={{ WebkitFlex: 1, marginLeft: 4, display: '-webkit-flex' }}><RaisedButton style={{ WebkitFlex: 1 }} label="Book now" primary={true} /></div>
                </div>
            </Card>
        );
    }
}

export class Meal extends React.Component {

    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        console.log(this.context);
        this.context.router.navigate(`/meals/${this.props.meal.id}`);
    }

    render() {

        return (
            <Card onClick={this._onClick} style={{ marginBottom: 8 }}>
                <CardHeader style={{ display: '-webkit-flex' }}
                    title={
                        <div style={{ display: '-webkit-flex' }}>
                            <div style={{ WebkitFlex: 1 }}>{ this.props.meal.user.firstName }</div>
                            <Rating score={ this.props.meal.user.rating } />
                        </div>
                    }
                    subtitle={ this.props.meal.user.bio }
                    avatar={ this.props.meal.user.avatar }/>
                <CardMedia overlay={<CardTitle title={ this.props.meal.title } subtitle={
                <div style={{ display: '-webkit-flex' }}>
                    <div style={{ WebkitFlex: 1, textAlign: 'left', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        <i style={{ fontSize: 12 }} className="material-icons">place</i>{ ' ' + this.props.meal.city }
                    </div>
                    <div style={{ WebkitFlex: 1, textAlign: 'center' }}>
                        <i style={{ fontSize: 12 }} className="material-icons">today</i>{ ' ' + this.props.meal.date.format('ddd. D/M') }
                    </div>
                    <div style={{ WebkitFlex: 1, textAlign: 'center' }}>
                        <i style={{ fontSize: 12 }} className="material-icons">people</i>{' ' + this.props.meal.seats + ' seats'}
                    </div>
                    <div style={{ WebkitFlex: 1, textAlign: 'right' }}>
                        <i style={{ fontSize: 12 }} className="material-icons">credit_card</i>{ ' £' + this.props.meal.price + '/p.' }
                    </div>
                </div>
                }/>}>
                    <img src={this.props.meal.pictures[0]}/>
                </CardMedia>
            </Card>
        );

    }
}

Meal.contextTypes = {
    router: React.PropTypes.func
};

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
                    "firstName": "John",
                    "bio": "Arsenal fanboy.",
                    "avatar": "http://lorempixel.com/100/100/people/",
                    "rating": 4.4
                },
                "id": 1,
                "title": "Indian Curry",
                "city": "Woolf college",
                "date": moment(),
                "price": 12.50,
                "seats": 8,
                "pictures": ["http://lorempixel.com/600/337/food/"]
            }, {
                "user": {
                    "firstName": "John",
                    "bio": "Arsenal fanboy.",
                    "avatar": "http://lorempixel.com/100/100/people/",
                    "rating": 4.4
                },
                "id": 1,
                "title": "Indian Curry",
                "city": "Woolf college",
                "date": moment(),
                "price": 12.50,
                "seats": 8,
                "pictures": ["http://lorempixel.com/600/337/food/"]
            }, {
                "user": {
                    "firstName": "John",
                    "bio": "Arsenal fanboy.",
                    "avatar": "http://lorempixel.com/100/100/people/",
                    "rating": 4.4
                },
                "id": 1,
                "title": "Indian Curry",
                "city": "Woolf college",
                "date": moment(),
                "price": 12.50,
                "seats": 8,
                "pictures": ["http://lorempixel.com/600/337/food/"]
            }, {
                "user": {
                    "firstName": "John",
                    "bio": "Arsenal fanboy.",
                    "avatar": "http://lorempixel.com/100/100/people/",
                    "rating": 4.4
                },
                "id": 1,
                "title": "Indian Curry",
                "city": "Woolf college",
                "date": moment(),
                "price": 12.50,
                "seats": 8,
                "pictures": ["http://lorempixel.com/600/337/food/"]
            }, {
                "user": {
                    "firstName": "John",
                    "bio": "Arsenal fanboy.",
                    "avatar": "http://lorempixel.com/100/100/people/",
                    "rating": 4.4
                },
                "id": 1,
                "title": "Indian Curry",
                "city": "Woolf college",
                "date": moment(),
                "price": 12.50,
                "seats": 8,
                "pictures": ["http://lorempixel.com/600/337/food/"]
            }, {
                "user": {
                    "firstName": "John",
                    "bio": "Arsenal fanboy.",
                    "avatar": "http://lorempixel.com/100/100/people/",
                    "rating": 4.4
                },
                "id": 1,
                "title": "Indian Curry",
                "city": "Woolf college",
                "date": moment(),
                "price": 12.50,
                "seats": 8,
                "pictures": ["http://lorempixel.com/600/337/food/"]
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