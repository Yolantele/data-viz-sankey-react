import testData from './data/testData'
import React from 'react'
import { CircularExample } from './views'
// import { render } from 'react-dom' // dont forget to comment out

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

// make sure to comment out:
// render(
//   <div style={{ backgroundColor: 'gray' }}>
//     <CircularSankey
//       fontColor={'lightgrey'}
//       width={900}
//       height={900}
//       fontSize={11}
//       unitString={'CO2 t'}
//     />
//     ,
//   </div>,
//   document.getElementById('root')
// )
