import React, { useRef } from 'react'

export function Logo(props) {
  return (
    <div class='middle'>
      <img class='logo' src={`/svg/7.svg`} />
      <a href='https://instagram.com/pondcoffee'>
        <h2>
          <a href='https://instagram.com/pondcoffee'>@pondcoffee</a>
        </h2>
      </a>
    </div>
  )
}
