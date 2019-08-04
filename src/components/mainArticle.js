/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

function MainArticle(props) {
    return (
        <React.Fragment>
            <div className="box first">
                <h2>{props.mainTitle}</h2>
                <p className="summary">{props.summary}</p>
                <button className="readArticle">Read article</button>
            </div>
            <div className="box second">
                <img src={props.image} />
            </div>
        </React.Fragment>
    )
}



export default MainArticle