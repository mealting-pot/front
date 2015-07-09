/**
 * Created by Jordan on 7/8/2015.
 */
'use strict';

import React from 'react';

export class Rating extends React.Component {
    render() {

        var max = this.props.max || 5;
        var score = this.props.score;
        var color = this.context.muiTheme.palette.accent1Color;
        var stars = [];

        for (var i = 0; i < max; i++) {
            if (i < Math.round(score)) {
                stars.push(<i key={i} className="material-icons" style={{ fontSize: 20 }} >star</i>);
            } else if (i < score) {
                stars.push(<i key={i} className="material-icons" style={{ fontSize: 20 }} >star_half</i>);
            } else {
                stars.push(<i key={i} className="material-icons" style={{ fontSize: 20 }} >star_border</i>);
            }
        }
        return (
            <div style={{ WebkitFlex: 1, textAlign: 'right', color: color }}>
                { stars }
            </div>
        )
    }
}

Rating.contextTypes = {
    muiTheme: React.PropTypes.object
};