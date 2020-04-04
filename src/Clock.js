import React from 'react'
import lightFormat from 'date-fns/lightFormat'

export const Clock = (props) => {
  const [date, setDate] = React.useState(new Date())

  //Replaces componentDidMount and componentWillUnmount
  React.useEffect(() => {
    var timerID = setInterval(() => tick(), 1000)
    return function cleanup() {
      clearInterval(timerID)
    }
  })

  function tick() {
    setDate(new Date())
  }

  return (
    <h2>
      {lightFormat(date, 'h')}
      <span className='blinker'>:</span>
      {lightFormat(date, 'mm')} pm
    </h2>
  )
}
