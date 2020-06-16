import testData from './data/testData'
import React from 'react'
import { CircularExample } from './views'
import { render } from 'react-dom'

const CircularSankey = ({ data = testData, width, height, absolutePosition, fontColor }) => {
  return (
    <div>
      <CircularExample {...{ data, width, height, absolutePosition, fontColor }} />
    </div>
  )
}

export default CircularSankey
render(<CircularSankey fontColor={'hotpink'} width={600} />, document.getElementById('root'))
