import React from 'react'
import Link from 'next/link'

const Nav = () => (
  <div className={`site-menu`}>
    <nav className={`site-nav px-4 px-md-5`} role="navigation">
      <ul className="list-unstyled pt-5">
        <li className="menu-item">
          <Link href="/">Home</Link>
        </li>
        <li className="menu-item">
          <Link href="/posts/">Previous Posts</Link>
        </li>
        <li className="menu-item">
          <Link href="/about/">About</Link>
        </li>
        <li className="menu-item">
          <Link href="/settings/">Settings</Link>
        </li>
        <li className="menu-item">
          <Link href="/logout/">Logout</Link>
        </li>
      </ul>
    </nav>
  </div>
)

export default Nav
