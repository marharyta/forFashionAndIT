import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import styled, { css } from 'styled-components';
import HashtagSelector from './hashtagSelector'


class ArticleLayout extends React.Component {
    render() {
        const { location, title, children } = this.props;
        const headerNavigation = (
            <React.Fragment>
                <h1>
                    {title}
                </h1>
                <div className="menu">
                    <Link to="/about/">about</Link>
                </div>
                <div className="search">search</div>
            </React.Fragment>
        )


        return (
            <React.Fragment>
                <header className="upperMenu">{headerNavigation}</header>
                <article>
                    {children}
                </article>
            </React.Fragment>
        )
    }
}

export default ArticleLayout;
