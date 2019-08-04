/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { Link, graphql } from "gatsby"

function ArticleThumbnail(props) {
    return (
        <div className="box post">
            <img src={props.imageURL} />
            <h2>{props.title}</h2>
            <button className="readArticle"><Link to={props.articleURL}>Read article</Link></button>
        </div>
    )
}



export default ArticleThumbnail