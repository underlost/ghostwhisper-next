import React from "react"
import PropTypes from "prop-types"

import "../styles/style.scss"

// eslint-disable-next-line react/prop-types
function WhisperApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default WhisperApp
