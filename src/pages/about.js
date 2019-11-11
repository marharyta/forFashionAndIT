import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutArticle from "../components/aboutArticle"
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
        <div className="container">
          <AboutArticle 
          mainTitle="Hello, my name is Margo. I am a software engineer" 
          summary="My name is Margo, I work as a software engineer.
          I work as a full stack developer and digital creative director, combining my technical expertise, ux/ui and computer graphics knowledge.
          I like drinking latte in nice looking coffee shops around the world (gladly I travel quite often), experimenting with technologies, 
          learning something new every day.You can catch me in your country if you follow me on Instagram. 
          Currently I work as a software engineer consultant in Helsinki. Finland." 
          image="https://instagram.fqlf1-1.fna.fbcdn.net/vp/321f8dd69ffae07840c1e9dc210636d5/5DB56C7F/t51.2885-15/e35/p1080x1080/60854472_2790368244324495_8941172410672789901_n.jpg?_nc_ht=instagram.fqlf1-1.fna.fbcdn.net" />
        </div>
        <div className="posts-container">
          <ArticleThumbnail key={Math.random()} title={'Codepen'} imageURL={'https://images.unsplash.com/photo-1534349909450-a7716795cf06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'} articleURL={"yguyuy "} />
          <ArticleThumbnail key={Math.random()} title={'GitHub'} imageURL={'https://images.unsplash.com/photo-1528728935509-22fb14722a30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'} articleURL={"yguyuy "} />
        </div>
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
