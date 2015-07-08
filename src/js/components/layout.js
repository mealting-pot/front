/**
 * Created by Jordan on 08/07/2015.
 */
'use strict';

import React        from 'react';
import { Header }   from './header.js';
import { Content }  from './content.js';
import { Meals }    from './meal.js';

export class Layout extends React.Component {
    render() {

        var componentStyle = {
            display: '-webkit-flex',
            WebkitFlexDirection: 'column',
            WebkitFlex: 1
        };

        return (
            <div style={ componentStyle }>
                <Header/>
                <Content>
                    <Meals/>
                </Content>
            </div>
        );
    }
}