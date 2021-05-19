import React from 'react'
import PropTypes from 'prop-types'

import '../scss/site.scss'

function WhisperApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default WhisperApp

WhisperApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.node.isRequired,
}
