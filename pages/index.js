import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import LoginWrapper from '../components/LoginWrapper'
import Layout from '../components/Layout'
import CreatePost from '../components/CreatePost'

export default function IndexPage() {
  return (
    <LoginWrapper>
      <Head>
        <title>Share something...</title>
      </Head>
      <Layout>
        <CreatePost />
        <div className="pt-4">
          <Link href="/live/">
            <a className="btn btn-primary w-100">Go Live</a>
          </Link>
        </div>
      </Layout>
    </LoginWrapper>
  )
}
