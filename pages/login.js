import React, { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import Head from 'next/head'
import { getCurrentUser, handleLogin } from '../util/storage'
import { useRouter } from 'next/router'
import { isLoggedIn } from '../util/storage'

export default function LoginPage() {
  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI
  const [siteNameState, setSiteNameState] = useState(siteName)
  const [siteAPIState, setSiteAPIState] = useState(siteAPI)
  const router = useRouter()

  if (isLoggedIn()) {
    router.push(`/`)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({
      siteName: siteNameState,
      siteAPI: siteAPIState,
    })
    router.push(`/`)
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <form
          className={`form`}
          method="post"
          onSubmit={(event) => {
            handleSubmit(event)
            //navigate(`/`)
          }}>
          <div className="form-group">
            <label className={`label d-block`}>
              URL
              <input className={`form-control`} type="text" name="siteName" value={siteNameState} onChange={(event) => setSiteNameState(event.target.value)} />
            </label>
          </div>
          <div className="form-group pb-4">
            <label className={`label d-block`}>
              API Key
              <textarea className={`form-control`} type="text" name="siteAPI" value={siteAPIState} onChange={(event) => setSiteAPIState(event.target.value)} />
            </label>
          </div>
          <input className={`btn btn-block w-100 btn-primary`} type="submit" value="Log In" />
        </form>

        <p className="pt-2">
          <Link href="/about/">
            <a>What is this?</a>
          </Link>
        </p>
      </Layout>
    </>
  )
}
