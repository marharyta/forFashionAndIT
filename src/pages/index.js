import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import StyledLayout from "../components/layout"
import SEO from "../components/seo"
import MainArticle from "../components/mainArticle"
import ArticleThumbnail from "../components/articleThumbnail"
import { rhythm } from "../utils/typography"
import "../styles/index.scss"


class BlogIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <StyledLayout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div className="container">
          <MainArticle mainTitle="A tale of Webpack 4 and how to finally configure it in the right way.
          Updated." summary="This blogpost has been last updated 28.12.2018 with webpack v4.28.0
          Update 23.06.2018: I have received a bunch of comments about what
          worked and what can be improved! Thank you for your feedback! I have
          tried to take every comment into consideration here! At a certain
          point I have also decided to create a webpack boilerplate project on
          github, were you can git pull the latest webapck.config! Thank you for
your support!" image="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"/>
        </div>
        <div className="posts-container">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const image = node.frontmatter.image || '';
            console.log('see node content', node)
            return (
              <ArticleThumbnail key={title + Math.random()} title={title} imageURL={image} articleURL={node.fields.slug} />)
          })}
        </div>
      </StyledLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            image
            description
          }
        }
      }
    }
  }
`
