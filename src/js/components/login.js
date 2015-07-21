/**
 * Created by Jordan on 19/07/2015.
 */

import React from 'react';

import { Card, CardText, Tabs, Tab, TextField, Buttons, RaisedButton } from 'material-ui';

import { loginActions } from '../actions/login.js';

import { loginStore } from '../stores/login.js';

class RegisterForm extends React.Component {

    constructor() {
        super();

        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit(evt) {
        evt.preventDefault();
        loginActions.register({
            firstName: this.refs.firstName.getValue(),
            lastName: this.refs.lastName.getValue(),
            email: this.refs.mail.getValue(),
            password: this.refs.password.getDOMNode().childNodes[1].value
        });
    }

    render() {
        return (
            <form onSubmit={ this._onSubmit } style={{ display: '-webkit-flex', WebkitFlexDirection: 'column', WebkitFlex: 1 }}>
                <div style={{ display: '-webkit-flex', WebkitFlexDirection: 'row', WebkitFlex: 1 }}>
                    <TextField ref="firstName" style={{ WebkitFlex: 1 }} floatingLabelText="First name" />
                    <TextField ref="lastName" style={{ WebkitFlex: 1 }} floatingLabelText="Last name" />
                </div>
                <div style={{ display: '-webkit-flex', WebkitFlexDirection: 'row', WebkitFlex: 1 }}>
                    <TextField ref="mail" style={{ WebkitFlex: 1 }} floatingLabelText="Mail" />
                </div>
                <div style={{ display: '-webkit-flex', WebkitFlexDirection: 'row', WebkitFlex: 1 }}>
                    <TextField ref="password" style={{ WebkitFlex: 1 }} floatingLabelText="Password">
                        <input type="password" />
                    </TextField>
                </div>
                <div style={{ display: '-webkit-flex', WebkitFlexDirection: 'row', WebkitFlex: 1 }}>
                    <RaisedButton primary={true} type="submit" style={{ WebkitFlex: 1 }} label="Register" />
                </div>
            </form>
        );
    }
}

class LoginForm extends React.Component {

    constructor() {
        super();

        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit(evt) {
        evt.preventDefault();
        loginActions.login({
            email: this.refs.mail.getValue(),
            password: this.refs.password.getDOMNode().childNodes[1].value
        });
    }

    render() {
        return (
            <form onSubmit={this._onSubmit} style={{ display: '-webkit-flex', WebkitFlexDirection: 'column', WebkitFlex: 1 }}>
                <div style={{ display: '-webkit-flex', WebkitFlexDirection: 'row', WebkitFlex: 1 }}>
                    <TextField ref="mail" style={{ WebkitFlex: 1 }} floatingLabelText="Mail" />
                </div>
                <div style={{ display: '-webkit-flex', WebkitFlexDirection: 'row', WebkitFlex: 1 }}>
                    <TextField ref="password" style={{ WebkitFlex: 1 }} floatingLabelText="Password">
                        <input type="password" />
                    </TextField>
                </div>
                <div style={{ display: '-webkit-flex', WebkitFlexDirection: 'row', WebkitFlex: 1 }}>
                    <RaisedButton primary={true} type="submit" style={{ WebkitFlex: 1 }} label="Login" />
                </div>
            </form>
        );
    }
}

export class LoginLayout extends React.Component {
    render() {
        return (
            <Card>
                <Tabs>
                    <Tab label="Login">
                        <div style={{ padding: 8 }}>
                            <LoginForm />
                        </div>
                    </Tab>
                    <Tab label="Registration" >
                        <div style={{ padding: 8 }}>
                            <RegisterForm />
                        </div>
                    </Tab>
                </Tabs>
           </Card>

        );
    }
}