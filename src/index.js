import './styles.css'
import wasteData from './data/geoFluxusData'
// import { render } from 'react-dom'
import React from 'react'
import { CircularExample } from './views'

const CircularSankey = ({ circularData = wasteData }) => {
  return <CircularExample data={circularData} width={900} height={1000} />
}

export default CircularSankey
// render(<CircularSankey />, document.getElementById('root'))
