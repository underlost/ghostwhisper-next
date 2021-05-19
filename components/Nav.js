import React from 'react'
import Link from 'next/link'

const Nav = () => (
  <div className={`site-menu`}>
    <nav className={`site-nav px-4 px-md-5`} role="navigation">
      <ul className="list-unstyled">
        <li className="menu-item">
          <Link href="/"><a>Home</a></Link>
        </li>
        <li className="menu-item">
          <Link href="/posts/"><a>Previous Posts</a></Link>
        </li>
        <li className="menu-item">
          <Link href="/about/"><a>About</a></Link>
        </li>
        <li className="menu-item">
          <Link href="/settings/"><a>Settings</a></Link>
        </li>
        <li className="menu-item">
          <Link href="/logout/"><a>Logout</a></Link>
        </li>
      </ul>
    </nav>
  </div>
)

export default Nav
