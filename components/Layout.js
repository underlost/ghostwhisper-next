import React, { useState } from "react"
import PropTypes from "prop-types"
import SVGLogo from "./svgLogo"
import Head from "next/head"
import Link from "next/link"
import Nav from "./Nav"

const Layout = ({ children }) => {
  const [menuState, setMenuState] = useState(`nav-is-closed`)
  const toggleMenu = () => {
    setMenuState((state) => (state === `nav-is-closed` ? `nav-is-active` : `nav-is-closed`))
  }
  return (
    <div id="page" className={`viewport ${menuState}`}>
      <Head>
        <title>GhostWhisper</title>
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Nav />
      <div className="site-wrapper pt-3 mx-md-auto max-w-lg mx-auto">
        <header className="site-header py-5 text-right d-block">
          <nav className="flex">
            <Link href="/" className="navbar-brand">
              <SVGLogo />
              <h1 className="sr-only">GhostWhisper</h1>
            </Link>
            <div className="toggle-wrapper pr-8">
              <button className={`button navbar-toggler`} data-target="page-wrap" onClick={() => toggleMenu()}>
                <span className={`icon-bar top-bar`} />
                <span className={`icon-bar middle-bar`} />
                <span className={`icon-bar middle-bar`} />
                <span className={`icon-bar bottom-bar`} />
                <span className={`sr-only`}>Toggle navigation</span>
              </button>
            </div>
          </nav>
        </header>

        <main className="site-main">{children}</main>
        <footer className="site-footer py-4 text-center">
          <p>
            GhostWhisper © {new Date().getFullYear()}. Built by{` `}
            <a target="_blank" rel="noreferrer noopener" href="https://tyler.codes/">
              Tyler Rilling
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
