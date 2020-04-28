import { Layout, Card, Typography } from 'antd'
import './styles.css'
import wasteData from './data/geoFluxusData'
import { render } from 'react-dom'
import React from 'react'
import { CircularExample } from './views'

const { Header, Footer, Content } = Layout

const App = () => (
  <div>
    <Header />
    <Content style={{ margin: 40 }}>
      <Card title='Circular Waste Data' style={{ margin: 20, backgroundColor: 'darkslategrey' }}>
        <CircularExample data={wasteData} width={900} height={1000} />
      </Card>
    </Content>

    <Footer style={{ height: 200 }} />
  </div>
)

render(<App />, document.getElementById('root'))
