import React from "react"
import Layout from "../components/Layout"
import PostsList from "../components/PostsList"

const IndexPage = () => (
  <>
    <Layout>
      <h6 className="h5 text-uppercase">My Posts</h6>
      <PostsList />
    </Layout>
  </>
)

export default IndexPage
