/**
 * Created by Jordan on 7/8/2015.
 */
'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';

import React        from 'react';
import { Styles }   from 'material-ui';
import { Layout }   from './js/components/layout.js';

var ThemeManager = new Styles.ThemeManager();

injectTapEventPlugin();

class APP extends React.Component {

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    render() {
        return (
            <Layout/>
        );
    }
}

APP.childContextTypes = {
    muiTheme: React.PropTypes.object
};

React.render(<APP/>, document.getElementById('app'));