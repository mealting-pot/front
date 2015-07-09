/**
 * Created by Jordan on 7/8/2015.
 */
'use strict';

import React from 'react';
import { Styles, Avatar } from 'material-ui';

export class CardHeader extends React.Component {

    render() {
        var styles = this.getStyles();
        var rootStyle = styles.root;
        var textStyle = styles.text;
        var titleStyle = styles.title;
        var subtitleStyle = styles.subtitle;

        var avatar = this.props.avatar;
        if (React.isValidElement(this.props.avatar)) {
            var avatarMergedStyle = styles.avatar;
            avatar = React.cloneElement(avatar, { style: avatarMergedStyle });
        } else avatar = React.createElement(Avatar, { src: this.props.avatar, style: styles.avatar });

        return (
            <div {...this.props} style={rootStyle}>
                {avatar}
                <div style={textStyle}>
                    <span style={titleStyle} >{this.props.title}</span>
                    <span style={subtitleStyle} >{this.props.subtitle}</span>
                </div>
            </div>
        );
    }

    getStyles() {
        return {
            root: {
                height: 72,
                padding: 16,
                fontWeight: Styles.Typography.fontWeightMedium,
                boxSizing: 'border-box',
                display: '-webkit-flex'
            },
            text: {
                display: 'inline-block',
                verticalAlign: 'top',
                WebkitFlex: 1
            },
            avatar: {
                marginRight: 16
            },
            title: {
                color: Styles.Colors.darkBlack,
                display: 'block',
                fontSize: 15
            },
            subtitle: {
                color: Styles.Colors.lightBlack,
                display: 'block',
                fontSize: 14
            }
        };
    }

}