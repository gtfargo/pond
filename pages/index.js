import { useEffect, useState, useRef, Fragment } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import classnames from 'classnames'
import axios from 'axios'

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export default function Home({ images }) {
  const [grid, setGrid] = useState(false)
  const [caption, setCaption] = useState(null)

  useEffect(() => {
    let scroll
    async function getLocomotive() {
      const Locomotive = (await import('locomotive-scroll')).default
      scroll = new Locomotive({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      })
      setTimeout(() => scroll.update(), 300)
    }
    renderGrid()
    getLocomotive()
    return () => {
      if (scroll) scroll.destroy()
    }
  }, [])

  const COLUMNS = 8

  function renderGrid() {
    const myGrid = grid ? grid : []
    console.log('rendering grid ', grid)
    if (!grid) {
      console.log('need to rebuild ', grid)
      const IMAGE_MIN = 3
      const IMAGE_MAX = 7

      images = shuffle(images).splice(0, 5)
      images.forEach((data, index) => {
        const spaceAfter = getRandomInt(0, 150)
        const imageWidth = getRandomInt(IMAGE_MIN, IMAGE_MAX)
        const duo = imageWidth == 3
        console.log(`image is ${imageWidth} columns wide`)

        let leftoverColumns = COLUMNS - imageWidth
        const inset = getRandomInt(0, leftoverColumns)
        const outset = leftoverColumns - inset
        myGrid.push(
          <Fragment key={index}>
            <div
              key={index}
              className={`col-span-${COLUMNS}`}
              style={{ height: spaceAfter }}
            />
            <div className={`col-span-${inset}`} />
            <div
              className={`col-span-${imageWidth}`}
              data-scroll
              data-scroll-speed={getRandomInt(0, 4)}
            >
              <img
                className={styles.image}
                onMouseOver={() => setCaption(data.caption)}
                src={data.url}
              />
            </div>
            <div className={`col-span-${outset}`} />
          </Fragment>
        )
      })
    }
    setGrid(myGrid)
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Pond Coffee</title>
          <link rel='icon' href='/favicon.ico' />
          <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
        </Head>
        <nav className={styles.header}>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
            <div
              data-scroll
              data-scroll-speed='1.8'
              data-scroll-delay='0.2'
              data-scroll-position='top'
              className={styles.navigation}
            >
              <h1
                data-scroll
                data-scroll-speed='2'
                data-scroll-delay='0.1'
                data-scroll-position='top'
              >
                POND COFFEE
              </h1>
              <div
                data-scroll
                data-scroll-speed='1.8'
                data-scroll-delay='0.1'
                data-scroll-position='top'
                className={styles.navList}
              >
                <h2 className={styles.navLink}>
                  <a href='#'>hours</a>
                </h2>
                <h2 className={styles.navLink}>
                  <a href='#'>shop</a>
                </h2>
              </div>
            </div>
          </div>
        </nav>
        <div data-scroll-container id='fixed-elements'>
          <main className={styles.main}>
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
              <div className={styles.grid}>
                <div className={`grid grid-cols-${COLUMNS} gap-4`}>{grid}</div>
              </div>
            </div>
          </main>
          <footer className={styles.footer}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
              <div className={styles.footerContents}>
                <h2>get in touch</h2>
                <p>
                  <a href='#'>Email: info@pondcoffee.com</a>
                </p>
                <a href='#'>
                  <ol>
                    <li>2700 Chartres St</li>
                    <li>New Orleans</li>
                    <li>LA 70117</li>
                  </ol>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
      {/* {caption && (
        <div className={classnames([styles.overlay, styles.center])}>
          <div className={styles.caption}>
            <div className={styles.marquee}>
              <div className={styles.marquee__inner} aria-hidden='true'>
                <p>
                  {caption} {caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  )
}

async function getImagesFromInstagram() {
  const userInfoSource = await axios.get(
    'https://www.instagram.com/pondcoffee/?__a=1'
  )

  const {
    data: {
      graphql: { user },
    },
  } = userInfoSource

  const {
    edge_owner_to_timeline_media: { edges },
  } = user

  const images = edges.map((data, index) => {
    const {
      node: { display_url, edge_media_to_caption },
    } = data

    return {
      url: display_url,
      caption: edge_media_to_caption.edges[0].node.text,
    }
  })

  const { biography, full_name } = user
  return {
    images,
    user: { biography, full_name },
    end_cursor: user.edge_owner_to_timeline_media.page_info.end_cursor,
  }
}

export async function getServerSideProps(context) {
  try {
    const props = await getImagesFromInstagram()
    return { props }
  } catch (e) {
    console.error('Unable to retrieve photos. Reason: ' + e.toString())
  }
}
