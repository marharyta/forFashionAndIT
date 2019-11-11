import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import styled, { css } from 'styled-components';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    // const rootPath = `${__PATH_PREFIX__}/`;
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
        <main>
          {children}
        </main>
        {/* <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer> */}
      </React.Fragment>
    )
  }
}


// const StyledLayout = styled(Layout)`
//  span{
//   color: palevioletred;
//   font-weight: bold;
//  }

// `;

// console.log('styled', styled)

// const StyledLayout = styled.div`
//   color: palevioletred;
//   font-weight: bold;
// `;

export default Layout;
