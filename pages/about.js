import React from "react"
import Head from "next/head"
import Layout from "../components/Layout"

const AboutPage = () => (
  <>
    <Head>
      <title>About GhostWhisper</title>
    </Head>
    <Layout>
      <div className="pt-4">
        <h2 className="h3">What is this?</h2>
        <p>Ghost Whisper is a simple interface for microblogging to your Ghost-based blog. Right now, this is simply an experiment with the Ghost Admin API.</p>
      </div>
    </Layout>
  </>
)

export default AboutPage
