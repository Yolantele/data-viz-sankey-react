import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Sankey from './Sankey'
import { Layout, Card, Button } from 'antd'

import './styles.css'
const { Header, Footer, Content } = Layout
const App = () => {
  const [data, setData] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ozlongblack/d3/master/energy.json')
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.group(data)
      })
  }, [])

  return (
    <div className='App'>
      <Header />
      <Content>
        <Card style={{ margin: 20, padding: 20, minWidth: 700 }}>
          <Button type={'primary'} onClick={() => setEditMode(!editMode)}>
            Edit Mode
          </Button>
          <Sankey data={data} edit={editMode} />
        </Card>
      </Content>
      <Footer style={{ height: 200 }} />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
