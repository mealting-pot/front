/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React        from 'react';
import { AppBar, FlatButton }   from 'material-ui';

import { Link } from 'react-router';

export class Header extends React.Component {
    render() {
        return (
            <AppBar onLeftIconButtonTouchTap={ this.props.onLeftIconButtonTouchTap } title='Mealting pot'/>
        );
    }
}