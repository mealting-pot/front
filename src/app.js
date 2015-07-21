/**
 * Created by Jordan on 7/8/2015.
 */
'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';

import React        from 'react';
import Router       from 'react-router';
import { Route, RouteHandler, HashLocation }    from 'react-router';
import { Styles }   from 'material-ui';
import { PostMealLayout } from './js/components/post-meal.js';
import { MealsLayout }    from './js/components/meal.js';
import { LoginLayout }  from './js/components/login.js';
import { Layout }   from './js/components/layout.js';

var ThemeManager = new Styles.ThemeManager();

injectTapEventPlugin();

class App extends React.Component {

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    render() {
        return (
            <Layout>
                <RouteHandler/>
            </Layout>
        );
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

var routes = (
    <Route handler={App}>
        <Route path="/" handler={MealsLayout} />
        <Route path="login" handler={LoginLayout} />
        <Route path="post-meal" handler={PostMealLayout} />
    </Route>
);

Router.run(routes, HashLocation, (Root) => {
    React.render(<Root/>, document.getElementById('app'));
});