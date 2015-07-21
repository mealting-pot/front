/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React        from 'react';
import { Navigation } from 'react-router';
import reactMixin   from 'react-mixin';
import { Header }   from './header.js';
import { Content }  from './content.js';
import { LoginLayout } from './login.js';
import { LinearProgress, LeftNav, MenuItem } from 'material-ui';

class AppLeftNav extends React.Component {

    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    _onChange(e, index, item) {
        console.log(this.context);
        this.transitionTo(item.route);
    }

    toggle() {
        this.refs.leftNav.toggle();
    }

    render () {

        var menuItems = [
            { text: 'Home', route: '/' },
            { text: 'Register / Login', route: '/login' },
            { text: 'Post a meal', route: '/post-meal' }
        ];

        return (
            <LeftNav ref="leftNav" onChange={this._onChange} docked={false} menuItems={menuItems}/>
        )
    }
}

reactMixin.onClass(AppLeftNav, Navigation);

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
        console.log('tap', arguments);
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
                <AppLeftNav ref="leftNav" />
                { window.navigator.standalone && <div style={{ height: 20, backgroundColor: this.context.muiTheme.palette.primary2Color }}/> }
                <Header onLeftIconButtonTouchTap={ this._tapMenuIcon } />
                { this.state.progress == true && <LinearProgress mode="indeterminate"/> }
                <Content>
                    { this.props.children }
                </Content>
            </div>
        );
    }
}

Layout.contextTypes = {
    muiTheme: React.PropTypes.object
};