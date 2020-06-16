import testData from './data/testData'
import React from 'react'
import { CircularExample } from './views'
// import { render } from 'react-dom'

const CircularSankey = ({
  data = testData,
  width,
  height,
  absolutePosition,
  fontColor,
  fontSize,
  unitString
}) => {
  return (
    <div>
      <CircularExample
        {...{ data, width, height, absolutePosition, fontColor, fontSize, unitString }}
      />
    </div>
  )
}

export default CircularSankey
// render(
//   <CircularSankey fontColor={'gray'} width={900} height={900} fontSize={18} unitString={'CO2 t'} />,
//   document.getElementById('root')
// )
