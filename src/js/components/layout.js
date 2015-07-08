/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React        from 'react';
import { Header }   from './header.js';
import { Content }  from './content.js';
import { Meals, MealLayout }    from './meal.js';
import { Location, Locations } from 'react-router-component';
import { LinearProgress  } from 'material-ui';

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
    }

    render() {

        var componentStyle = {
            display: '-webkit-flex',
            WebkitFlexDirection: 'column',
            WebkitFlex: 1
        };

        return (
            <div style={ componentStyle }>
                <Header/>
                { this.state.progress == true ? <LinearProgress mode="indeterminate"/> : '' }
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