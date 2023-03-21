import React, { useState } from "react"
import Head from "next/head"
import Layout from "../components/Layout"
import LoginWrapper from "../components/LoginWrapper"
import { getCurrentUser, updateUser } from "../util/storage"

const SettingsPage = () => {
  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI
  const [siteNameState, setSiteNameState] = useState(siteName)
  const [siteAPIState, setSiteAPIState] = useState(siteAPI)

  const handleSubmit = (event) => {
    event.preventDefault()
    updateUser({
      guid: getCurrentUser().guid,
      siteName: siteNameState,
      siteAPI: siteAPIState,
    })
  }

  return (
    <LoginWrapper>
      <Head>
        <title>Settings</title>
      </Head>
      <Layout>
        <form
          className="form"
          method="post"
          onSubmit={(event) => {
            handleSubmit(event)
            //navigate(`/`)
          }}
        >
          <div className="form-group mb-3">
            <label className="label d-block">
              URL
              <input className="form-control" type="text" name="siteName" value={siteNameState} onChange={(event) => setSiteNameState(event.target.value)} />
            </label>
          </div>
          <div className="form-group mb-3">
            <label className="label d-block">
              API Key
              <textarea className="form-control" type="text" name="siteAPI" value={siteAPIState} onChange={(event) => setSiteAPIState(event.target.value)} />
            </label>
          </div>
          <input className="btn btn-block btn-primary text-uppercase" type="submit" value="Update Settings" />
        </form>
      </Layout>
    </LoginWrapper>
  )
}

export default SettingsPage
