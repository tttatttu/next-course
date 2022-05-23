import {useEffect, useState} from "react";
import {MainLayout} from "../components/MainLayout";
import Link from "next/link";
import process from "../next.config";

export default function Posts({ posts: serverPosts }) {
  const [posts, setPosts] = useState(serverPosts)

  useEffect(() => {
    async function load() {
      const response =  await fetch(`${process.env.API_URL}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if (!serverPosts) {
      load()
    }
  }, [])

  if (!posts) {
    return <MainLayout>
      <p>Loading...</p>
    </MainLayout>
  }

  return (
    <MainLayout title='Posts page'>
      <h1>Posts Page</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/[id]`} as={`/post/${post.id}`}><a>{post.title}</a></Link>
          </li>
        ))}

      </ul>
    </MainLayout>
  )
}

Posts.getInitialProps = async ({ req }) => {
  const response =  await fetch('http://localhost:4200/posts')
  const posts = await response.json()

  if (!req) {
    return {posts: null}
  }

  return {
    posts
  }
}
