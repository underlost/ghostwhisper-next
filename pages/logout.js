import React from "react"
import Head from "next/head"
import Layout from "../components/Layout"
import LoginWrapper from "../components/LoginWrapper"
import { useRouter } from "next/router"

const LogoutPage = () => {
  const router = useRouter()
  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.removeItem(`ghostwhisperUser`)
    router.push(`/login/`)
  }
  return (
    <LoginWrapper>
      <Head>
        <title>Logout</title>
      </Head>
      <Layout>
        <h6 className="text-uppercase">Logout</h6>
        <p className="mb-5">Are you sure you want to logout?</p>
        <form
          className={`form`}
          method="post"
          onSubmit={(event) => {
            handleSubmit(event)
            //navigate(`/`)
          }}
        >
          <button className="btn btn-block btn-primary">Logout</button>
        </form>
      </Layout>
    </LoginWrapper>
  )
}

export default LogoutPage
