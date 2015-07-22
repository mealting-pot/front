/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React from 'react';

export class Content extends React.Component {
    render() {

        var componentStyle = {
            display: 'block',
            position: 'relative',
            overflow: 'auto',
            WebkitFlex: 1,
            WebkitOverflowScrolling: 'touch',
            padding: 8
        };

        return (
            <div style={ componentStyle }>
                { this.props.children }
            </div>
        );
    }
}