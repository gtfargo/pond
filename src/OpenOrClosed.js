import React from 'react'
import {
  isBefore,
  isAfter,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  setHours,
  isWednesday,
} from 'date-fns'

export const OpenOrClosed = (props) => {
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

  // check days
  let day = false
  let hours = false

  day =
    isWednesday(date) ||
    isThursday(date) ||
    isFriday(date) ||
    isSaturday(date) ||
    isSunday(date)

  // check hours
  hours =
    isBefore(date, setHours(new Date(), 13)) &&
    isAfter(date, setHours(new Date(), 8))

  return (
    <h2>
      {day && hours ? "we're open!" : 'sorry, we are closed right now'}
      <br /> wednesday - sunday <br />
      8am - 1pm
    </h2>
  )
}
