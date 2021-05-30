import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import LoginWrapper from '../components/LoginWrapper'
import LiveBlogPost from '../components/LiveBlogPost'

export default function LivePage() {
  return (
    <LoginWrapper>
      <Head>
        <title>Share something...</title>
      </Head>
      <Layout>
        <LiveBlogPost />
      </Layout>
    </LoginWrapper>
  )
}
