import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MainArticle from "../components/mainArticle"
import ArticleThumbnail from "../components/articleThumbnail"
import { rhythm } from "../utils/typography"
import "../styles/index.scss"

class About extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    // const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        {/* <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        /> */}
        <div class="container">
          <MainArticle mainTitle="Hello, my name is Margo." summary="This is me, Margo" image="https://instagram.fqlf1-1.fna.fbcdn.net/vp/321f8dd69ffae07840c1e9dc210636d5/5DB56C7F/t51.2885-15/e35/p1080x1080/60854472_2790368244324495_8941172410672789901_n.jpg?_nc_ht=instagram.fqlf1-1.fna.fbcdn.net" />
        </div>
        {/* <div class="posts-container">
                    {posts.map(({ node }) => {
                        const title = node.frontmatter.title || node.fields.slug
                        const image = node.frontmatter.image || '';
                        console.log('see node content', node)
                        return (
                            <ArticleThumbnail title={title} imageURL={image} />)
                    })}
                </div> */}
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
