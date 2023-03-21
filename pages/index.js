import React, { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import LoginWrapper from "../components/LoginWrapper"
import Layout from "../components/Layout"
import CreatePost from "../components/CreatePost"
import { getCurrentUser } from "../util/storage"

export default function IndexPage() {
  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI

  const [siteNameState, setSiteNameState] = useState(``)
  const [siteAPIState, setSiteAPIState] = useState(``)

  useEffect(() => {
    setSiteNameState(siteName)
    setSiteAPIState(siteAPI)
  }, [siteName, siteAPI])

  return (
    <>
      <Head>
        <title>Share something...</title>
      </Head>
      <Layout>
        {siteNameState && siteAPIState ? <CreatePost /> : <>You need to save a site name and api key.</>}
        <div className="pt-4">
          <Link href="/live/" className="btn btn-primary w-100">
            Go Live
          </Link>
        </div>
      </Layout>
    </>
  )
}
