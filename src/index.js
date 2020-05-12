import testData from './data/testData'
import React, { useState } from 'react'
import { CircularExample } from './views'
// import { render } from 'react-dom'
import { style } from './views/style'

const margins = {
  top: 50,
  left: 300,
  right: 50,
  bottom: -90
}
const ResetButton = ({ onButtonClick }) => (
  <section style={style.box}>
    <br />
    <button style={style.button} onClick={onButtonClick}>
      Reset
    </button>
    <h5 style={{ fontFamily: 'sans-serif', ...style.font }}>
      click on square nodes to highlight exclusive links
    </h5>
  </section>
)

const CircularSankey = ({
  data = testData,
  width = 1000,
  height = 900,
  absolutePosition = margins
}) => {
  const [opacities, setOpacities] = useState([])

  return (
    <div>
      <CircularExample {...{ data, width, height, absolutePosition, opacities, setOpacities }} />
      <ResetButton onButtonClick={() => setOpacities([])} />
    </div>
  )
}

export default CircularSankey
// render(<CircularSankey />, document.getElementById('root'))
