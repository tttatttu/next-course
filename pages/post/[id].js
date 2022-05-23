import {useRouter} from "next/router";

import Link from "next/link";
import {MainLayout} from "../../components/MainLayout";
import {useEffect, useState} from "react";
import process from "../../next.config";

export default function Post({ post: serverPost }) {
  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(() => {
      async function load() {
        const response =  await fetch(`${process.env.API_URL}/posts/${router.query.id}`)
        const data = await response.json()
        setPost(data)
      }
      if (!serverPost) {
        load()
      }
  }, [])

  if (!post) {
    return <MainLayout>
        <p>Loading...</p>
      </MainLayout>
  }

  return (
    <MainLayout>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href='/posts'><a>Back to all posts</a></Link>
    </MainLayout>
  )
}

// и бэк и фронт
Post.getInitialProps = async ({ query, req }) => {
  const response =  await fetch(`${process.env.API_URL}/posts/${query.id}`)
  const post = await response.json()

  if (!req) {
    return {post: null}
  }

  return {
    post
  }
}

//только бэк
// export async function getServerSideProps({ query, req }) {
//   const response =  await fetch(`${process.env.API_URL}/posts/${query.id}`)
//   const post = await response.json()
//
//   return {props: {post}}
//
// }
