import React from 'react'
import PropTypes from 'prop-types'
import { isLoggedIn } from '../util/storage'
import { useRouter } from 'next/router'

const LogginWrapper = ({ children }) => {
  const router = useRouter()

  if (isLoggedIn()) {
    return <div className="loggedIn">{children}</div>
  } else {
    if (typeof window !== `undefined`) {
      router.push(`/login/`)
    }
    return null
  }
}

LogginWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LogginWrapper
