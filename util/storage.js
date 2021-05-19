const isBrowser = typeof window !== `undefined`
const getUser = () => (window.localStorage.ghostwhisperUser ? JSON.parse(window.localStorage.ghostwhisperUser) : {})
const setUser = user => (window.localStorage.ghostwhisperUser = JSON.stringify(user))

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime()
  if (typeof performance !== `undefined` && typeof performance.now === `function`) {
    d += performance.now() //use high-precision timer if available
  }
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === `x` ? r : (r & 0x3) | 0x8).toString(16)
  })
}
export const createGUID = () => isBrowser && generateUUID()

export const handleLogin = ({ siteName, siteAPI }) => {
  if (!isBrowser) {
    return false
  }
  console.log(`Creating new sesstion`)
  return setUser({
    guid: generateUUID(),
    siteName: siteName,
    siteAPI: siteAPI,
  })
}

export const updateUser = ({ guid, siteName, siteAPI }) => {
  if (!isBrowser) {
    return false
  }
  if (guid === getCurrentUser().guid) {
    console.log(`Session matches! Updating the active user.`)
    return setUser({
      guid: guid,
      siteName: siteName,
      siteAPI: siteAPI,
    })
  }
  return false
}

export const isLoggedIn = () => {
  if (!isBrowser) {
    return false
  }
  const user = getUser()
  return !!user.guid
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = (callback) => {
  if (!isBrowser) {
    return
  }
  console.log(`Ensuring the \`ghostwhisperUser\` property exists.`)
  setUser({})
  callback()
}
