import React from "react"
import Layout from "../components/Layout"
import LoginWrapper from "../components/LoginWrapper"
import PostsList from "../components/PostsList"

const IndexPage = () => (
  <LoginWrapper>
    <Layout>
      <h6 className="h5 text-uppercase">My Posts</h6>
      <PostsList />
    </Layout>
  </LoginWrapper>
)

export default IndexPage
