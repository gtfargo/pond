import React from 'react'

export class Logo extends React.Component {
  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
  }
  render() {
    return (
      <img
        alt='POND Coffee logomark'
        className='logo'
        src={`/svg/${this.getRandomIntInclusive(1, 7)}.svg`}
      />
    )
  }
}
