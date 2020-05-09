import testData from './data/testData'
import { render } from 'react-dom'
import React from 'react'
import { CircularExample } from './views'

const margins = {
  top: 50,
  left: 300,
  right: 50,
  bottom: 0
}

const CircularSankey = ({
  data = testData,
  width = 900,
  height = 1000,
  absolutePosition = margins
}) => {
  return <CircularExample {...{ data, width, height, absolutePosition }} />
}

export default CircularSankey
render(<CircularSankey />, document.getElementById('root'))
