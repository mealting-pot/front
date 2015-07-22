/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React from 'react';
import { Styles, Card, CardTitle, CardMedia, Paper, RaisedButton, FontIcon, LinearProgress } from 'material-ui';
import { Navigation } from 'react-router';
import reactMixin   from 'react-mixin';

import { Link } from 'react-router';
import { CardHeader } from './material/card-header.js';
import { Rating } from './rating.js';
import { mealsStore } from '../stores/meals.js';
import { usersStore } from '../stores/users.js';
import { picturesStore } from '../stores/pictures.js';

import { mealsActions } from '../actions/meals.js';
import { usersActions } from '../actions/users.js';
import { picturesActions } from '../actions/pictures.js';

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
            <Card className="meal-card">
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

class MealCardHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.user = usersStore.getUser(this.props.userId);
        if (!this.state.user) {
            usersActions.loadUser(this.props.userId);
        }

        this._onChange = this._onChange.bind(this);
    }

    _onChange() {
        var user = usersStore.getUser(this.props.userId);

        if (user) {
            this.setState({
                user
            });
        }
    }

    componentDidMount() {
        usersStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        usersStore.removeChangeListener(this._onChange);
    }

    render() {

        if (!this.state.user) {
            return (
                <LinearProgress mode="indeterminate"  />
            )
        }

        return (
            <CardHeader style={{ display: '-webkit-flex' }}
                        title={
                        <div style={{ display: '-webkit-flex' }}>
                            <div style={{ WebkitFlex: 1 }}>{ this.state.user.firstName }</div>
                            <Rating score={ this.state.user.rating } />
                        </div>
                    }
                        subtitle={ this.state.user.bio }
                        avatar={ this.state.user.avatar }/>
        );
    }
}

class MealPicture extends React.Component {
    constructor(props) {
        super(props);

        this._onMealsChange = this._onMealsChange.bind(this);
        this._onPicturesChange = this._onPicturesChange.bind(this);

        this.state = {};
        this.state.pictures = mealsStore.getMealPictures(this.props.mealId);

        if (this.state.pictures) {
            if (this.state.pictures[0]) {
                this.state.picture = picturesStore.getPicture(this.state.pictures[0].id);
                if (!this.state.picture) {
                    picturesStore.loadPicture(this.state.pictures[0].id);
                }
            }
        } else {
            mealsActions.loadPictures(this.props.mealId);
        }

    }

    _onMealsChange() {
        var pictures = mealsStore.getMealPictures(this.props.mealId);
        this.setState({
            pictures
        });
        if (pictures && pictures[0]) {
            var picture = picturesStore.getPicture(pictures[0].id);
            this.setState({
                picture
            });
            if (!picture) {
                picturesActions.loadPicture(pictures[0].id);
            }
        }
    }

    _onPicturesChange() {
        if (this.state.pictures && this.state.pictures[0]) {
            var picture = picturesStore.getPicture(this.state.pictures[0].id);
            if (!picture) {
                picturesActions.loadPicture(this.state.pictures[0].id);
            } else {
                this.setState({
                    picture
                });
            }
        }
    }

    componentDidMount() {
        mealsStore.addChangeListener(this._onMealsChange);
        picturesStore.addChangeListener(this._onPicturesChange);
    }

    componentWillUnmount() {
        mealsStore.removeChangeListener(this._onMealsChange);
        picturesStore.removeChangeListener(this._onPicturesChange);
    }

    render() {
        if (!this.state.picture) {
            return (
                <LinearProgress mode="indeterminate"  />
            );
        }

        return (
            <img className="meal-image" src={this.state.picture.data} style={{ width: '100%', marginBottom: -4 }} />
        );
    }
}

export class Meal extends React.Component {

    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this._onChange = this._onChange.bind(this);

        this.state = {};
        this.state.meal = mealsStore.getMeal(this.props.meal.id);
        if (!this.state.meal) {
            mealsActions.loadMeal(this.props.meal.id);
        }
    }

    _onClick() {
        this.transitionTo(`/meal/${this.props.meal.id}`);
    }

    _onChange() {
        this.setState({
            meal: mealsStore.getMeal(this.props.meal.id)
        });
    }

    componentDidMount() {
        mealsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        mealsStore.removeChangeListener(this._onChange);
    }

    render() {

        if (!this.state.meal) {
            return (
                <Card>
                    <LinearProgress mode="indeterminate"  />
                </Card>
            )
        }

        var date = moment(this.state.meal.date);
        return (
            <Card className="meal-card" style={{ marginTop: 8 }} onClick={this._onClick}>
                <MealCardHeader userId={this.state.meal.userId} />
                <CardMedia style={{ minHeight: 97 }} overlay={<CardTitle title={ this.state.meal.title } subtitle={
                    <div style={{ display: '-webkit-flex' }}>
                        <div style={{ WebkitFlex: 1, textAlign: 'left', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            <i style={{ fontSize: 12 }} className="material-icons">place</i>{ ' ' + this.state.meal.city }
                        </div>
                        <div style={{ WebkitFlex: 1, textAlign: 'center' }}>
                            <i style={{ fontSize: 12 }} className="material-icons">today</i>{ ' ' + date.format('ddd. D/M') }
                        </div>
                        <div style={{ WebkitFlex: 1, textAlign: 'center' }}>
                            <i style={{ fontSize: 12 }} className="material-icons">people</i>{' ' + this.state.meal.seats + ' seats'}
                        </div>
                        <div style={{ WebkitFlex: 1, textAlign: 'right' }}>
                            <i style={{ fontSize: 12 }} className="material-icons">credit_card</i>{ ' £' + this.state.meal.price + '/p.' }
                        </div>
                    </div>
                }/>}>
                    <MealPicture mealId={ this.state.meal.id } />
                </CardMedia>
            </Card>
        );

    }
}

reactMixin.onClass(Meal, Navigation);

export class MealsLayout extends React.Component {

    constructor() {
        super();
        mealsActions.queryMeals();
        this.state = {
            meals: this._getMeals()
        };

        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        mealsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        mealsStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            meals: this._getMeals()
        });
    }

    _getMeals() {
        return mealsStore.getSearchResults();
    }

    render() {

        var meals = this.state.meals.map((meal, i) => <Meal meal={ meal } key={ i } />);

        return (
            <div>
                { meals }
                <div style={{ position: 'fixed', bottom: 0, left: 0, padding: 10, width: 'calc(100% - 36px)' }}>
                    <RaisedButton style={{ width: '100%', textAlign: 'center' }} primary={true} label="Filters">
                    </RaisedButton>
                </div>
            </div>
        );
    }
}