import { Layout, Card, Button, Typography } from 'antd'
import './styles.css'
import wasteData from './data/geoFluxusData'
import wasteDataCirc from './data/geoFluxusDataReduced'
import circularData from './data/circularData'
import { render } from 'react-dom'
import React from 'react'
import { CircularExample, Example } from './views'

const { Header, Footer, Content } = Layout

const App = () => (
  <div>
    <Header />
    <Content style={{ margin: 40 }}>
      <Typography.Title style={{ margin: 20 }}>Circular Sankey Examples:</Typography.Title>
      <Card title='with original geoFluxus Data' style={{ margin: 20, backgroundColor: '#707070' }}>
        <CircularExample data={wasteData} width={900} height={1000} />
      </Card>
      <Card
        title="geoFluxus data with the most 'overworked' node represented as new node (marked CIRC):"
        style={{ margin: 20, backgroundColor: '#808080' }}>
        <CircularExample data={wasteDataCirc} width={700} height={500} />
      </Card>
      <Card
        title='with fewer links to each node'
        style={{ margin: 20, backgroundColor: '#707070' }}>
        <CircularExample data={circularData} width={960} height={500} />
      </Card>
    </Content>

    <Footer style={{ height: 200 }} />
  </div>
)

render(<App />, document.getElementById('root'))
