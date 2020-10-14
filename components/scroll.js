import React, { useEffect } from 'react'
import LocomotiveScroll from 'locomotive-scroll'

const Component = () => {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      smoothMobile: false,
    })
  }, [])
  return <div />
}

export default Component
