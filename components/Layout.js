import React from 'react'
import PropTypes from 'prop-types'
import SVGLogo from './svgLogo'
import Head from 'next/head'

const Layout = ({ children }) => (
  <>
    <Head>
      <title>GhostWhisper</title>
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <div className="site-wrapper pt-3 mx-4 mx-md-auto">
      <header className="site-header pb-3 text-right d-block">
        <h1 className="visually-hidden">GhostWhisper</h1>
      </header>

      <main className="site-main">{children}</main>
      <footer className="site-footer py-4 text-center">
        <div className="d-block">
          <SVGLogo />
        </div>
        <p>
          GhostWhisper © {new Date().getFullYear()}. Built by{` `}
          <a target="_blank" rel="noreferrer noopener" href="https://tyler.codes/">
            Tyler Rilling
          </a>
          .
        </p>
      </footer>
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
