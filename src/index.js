import { Layout, Card, Button, Typography } from 'antd'
import './styles.css'
import wasteData from './data/geoFluxusData'
import circularData from './data/circularData'
import { render } from 'react-dom'
import React from 'react'
import { CircularExample, Example } from './views'

const { Header, Footer, Content } = Layout

const App = () => (
  <div>
    <Header />
    <Content>
      <Card title='Circular sankey example' style={{ margin: 20, backgroundColor: '#707070' }}>
        {/* <CircularExample data={circularData} width={960} height={500} /> */}
        <CircularExample data={wasteData} width={900} height={1000} />
      </Card>
    </Content>

    <Footer style={{ height: 200 }} />
  </div>
)

render(<App />, document.getElementById('root'))
