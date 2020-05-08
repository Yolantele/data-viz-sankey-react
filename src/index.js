import { Card, Typography } from 'antd'
import './styles.css'
import wasteData from './data/geoFluxusData'
import { render } from 'react-dom'
import React from 'react'
import { CircularExample } from './views'

const App = () => (
  <Card style={{ backgroundColor: 'grey', borderRadius: 20 }}>
    <CircularExample data={wasteData} width={900} height={1000} />
  </Card>
)

render(<App />, document.getElementById('root'))
