import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
  url: process.env.BLOG_URL,
  key: process.env.API_KEY,
  version: `v3`,
})

export async function getPosts() {
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
