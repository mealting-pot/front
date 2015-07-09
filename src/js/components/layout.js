/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React        from 'react';
import { Header }   from './header.js';
import { Content }  from './content.js';
import { Meals, MealLayout }    from './meal.js';
import { Location, Locations } from 'react-router-component';
import { LinearProgress, LeftNav } from 'material-ui';

export class Layout extends React.Component {

    _showProgressBar(){
        this.setState({progress: true});
    }

    _hideProgressBar(){
        this.setState({progress: false});
    }

    constructor(props) {
        super(props);

        this.state = {
            progress: false
        };

        this._showProgressBar = this._showProgressBar.bind(this);
        this._hideProgressBar = this._hideProgressBar.bind(this);
        this._tapMenuIcon = this._tapMenuIcon.bind(this);
    }

    _tapMenuIcon() {
        this.refs.leftNav.toggle();
    }

    render() {

        var componentStyle = {
            display: '-webkit-flex',
            WebkitFlexDirection: 'column',
            WebkitFlex: 1
        };

        return (
            <div style={ componentStyle }>
                <LeftNav ref="leftNav" docked={false} menuItems={[{ text: 'get-started' }]}/>
                { window.navigator.standalone && <div style={{ height: 20, backgroundColor: this.context.muiTheme.palette.primary2Color }}/> }
                <Header onLeftIconButtonTouchTap={ this._tapMenuIcon } />
                { this.state.progress == true && <LinearProgress mode="indeterminate"/> }
                <Content>
                    <Locations hash onBeforeNavigation={this._showProgressBar} onNavigation={this._hideProgressBar}>
                        <Location path="/" handler={Meals} />
                        <Location path="/meals/:mealId" handler={MealLayout} />
                    </Locations>
                </Content>
            </div>
        );
    }
}

Layout.contextTypes = {
    muiTheme: React.PropTypes.object
};