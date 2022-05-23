import Link from "next/link";
import c from '../styles/error.module.scss'

export default function ErrorPage() {
  return (
    <div className={c.error}>
      <h1 className={c.title}>Error 404</h1>
      <p className={c.subTitle}>Please <Link href='/'><a>go to start</a></Link></p>
    </div>
  )
}
