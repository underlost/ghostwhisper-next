import GhostAdminAPI from '@tryghost/admin-api'
import { getCurrentUser } from '../util/storage'

export async function getPosts() {
  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI

  const api = new GhostAdminAPI({
    url: siteName,
    key: siteAPI,
    version: `v3`,
  })

  let posts = await api.posts
    .browse({
      limit: `all`,
      filter: `tag:hash-aside`,
    })
    .catch((err) => {
      console.error(err)
    })

  return posts
}
