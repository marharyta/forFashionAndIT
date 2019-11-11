import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import ArticleLayout from "../components/articleLayout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import hljs from "highlight.js/lib/highlight"
import javascript from "highlight.js/lib/languages/javascript"
import css from "highlight.js/lib/languages/css"
import xml from "highlight.js/lib/languages/xml"
// import 'highlight.js/styles/github.css';

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    hljs.registerLanguage("javascript", javascript)
    hljs.registerLanguage("css", css)

    hljs.registerLanguage("xml", xml)
  }
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <ArticleLayout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="blogpost-container">
          <img
            src={
              post.frontmatter.image !== null &&
              post.frontmatter.image.publicURL
                ? post.frontmatter.image.publicURL
                : "https://images.unsplash.com/photo-1480099835147-7b8f6c6f8b98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            }
            className="mainImage"
          />
          <h1>{post.frontmatter.title}</h1>
          <h2>{post.frontmatter.description}</h2>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <p>
            {post.frontmatter.links != undefined ? (
              <a href={post.frontmatter.links[0].link}>
                {post.frontmatter.links[0].platform}
              </a>
            ) : null}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio />
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </div>
      </ArticleLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          publicURL
        }
      }
    }
  }
`
