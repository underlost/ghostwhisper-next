import React from 'react'
import Head from 'next/head'
import LoginWrapper from '../components/LoginWrapper'
import CreatePost from '../components/CreatePost'

export default function IndexPage() {
  return (
    <LoginWrapper>
      <Head>
        <title>Share something...</title>
      </Head>
      <CreatePost />
    </LoginWrapper>
  )
}
