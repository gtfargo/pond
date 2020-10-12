import Head from 'next/head'
import styles from '../styles/Home.module.css'
import classnames from 'classnames'

const mainStyles = classnames([
  'max-w-7xl mx-auto sm:px-6 lg:px-8',
  styles.main,
])

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pond Coffee</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
      </Head>

      <nav className={styles.navigation}></nav>
      <main className={mainStyles}></main>
      <footer className={styles.footer}></footer>
    </div>
  )
}
