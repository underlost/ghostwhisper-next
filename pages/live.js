import React, { useState, useEffect } from "react"
import Head from "next/head"
import Layout from "../components/Layout"
import LiveBlogPost from "../components/LiveBlogPost"
import { getCurrentUser } from "../util/storage"

export default function LivePage() {
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
      <Layout>{siteNameState && siteAPIState ? <LiveBlogPost /> : <>You need to save a site name and api key.</>}</Layout>
    </>
  )
}
