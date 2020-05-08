import React, { useState } from 'react'
import { Group } from '@vx/group'
import { Tooltip, Typography } from 'antd'
import { Text } from '@vx/text'
import { scaleSequential } from 'd3-scale'
import { interpolateCool } from 'd3-scale-chromatic'
import { extent } from 'd3-array'
import { CircularSankey as Sankey } from '../comps'
import { Button } from 'antd'

const color = scaleSequential(interpolateCool)
const marginBase = {
  top: 50,
  left: 130,
  right: 50,
  bottom: 0
}

const boxStyle = {
  width: '100%',
  display: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20
}

const MIN_DATA_WIDTH = 0

const CircularExample = ({ data, width, height, margin = marginBase }) => {
  const [opacities, setOpacities] = useState([])

  let opacity = 0.7

  const asignOpacity = (index, circular) => {
    if (opacities.length === 0 && !circular) return opacity
    if (opacities.length === 0 && circular) return opacity / 2
    if (opacities.includes(index) && !circular) return opacity
    if (opacities.includes(index) && circular) return opacity / 2
    else return 0.05
  }

  return (
    <>
      <section style={boxStyle}>
        <Typography.Text size='small'>
          Hover and Click on the square nodes and names to reveal exclusive connections
        </Typography.Text>
        <br />
        <Button type='primary' onClick={() => setOpacities([])} style={{ marginTop: 10 }}>
          Reset Diagram
        </Button>
      </section>
      <svg width={width + margin.left + margin.right} height={height + margin.bottom + margin.top}>
        <Sankey
          top={margin.top}
          left={margin.left}
          data={data}
          size={[width, height]}
          nodeWidth={10}
          nodePadding={25}
          nodePaddingRatio={0.5}
          nodeId={(d) => d.name}
          iterations={3}>
          {({ data }) => {
            return (
              <Group>
                {
                  // Hack to set color domain after <Sankey> has set depth
                  color.domain(extent(data.nodes, (d) => d.depth))
                }
                {data.nodes.map((node, i) => {
                  const { x0, x1, y0, y1, index, name, sourceLinks, targetLinks } = node
                  let linksWithHighOpacity = []
                  let nodesWithHighOpacity = []
                  console.log(node)
                  if (y1 - y0 > MIN_DATA_WIDTH) {
                    return (
                      <Group top={y0} left={x0} key={`node-${i}`}>
                        <rect
                          onClick={() => {
                            sourceLinks.forEach((link) => linksWithHighOpacity.push(link.index))
                            targetLinks.forEach((link) => linksWithHighOpacity.push(link.index))
                            setOpacities(linksWithHighOpacity)
                          }}
                          id={`rect-${i}`}
                          width={x1 - x0}
                          height={y1 - y0}
                          fill={color(index)}
                          opacity={0.8}
                          stroke={color(index)}
                          strokeWidth={2}
                        />
                        <Tooltip title={name.toLowerCase()}>
                          <Text
                            x={x0 < 900 / 2 ? -5 : 20}
                            y={(y1 - y0) / 2}
                            verticalAnchor='middle'
                            style={{
                              fontSize: 12,
                              textAnchor: x0 < 900 / 2 ? 'end' : 'start'
                            }}>
                            {name.length > 15
                              ? name.substr(2, 15).toLowerCase() + '...'
                              : name.substr(2, 15).toLowerCase()}
                          </Text>
                        </Tooltip>
                      </Group>
                    )
                  }
                  return null
                })}

                <Group strokeOpacity={1}>
                  {data.links.map((link, i) => {
                    const { width, target, circular, path, index } = link
                    if (width > MIN_DATA_WIDTH) {
                      return (
                        <path
                          key={`link-${i}`}
                          d={path}
                          stroke={color(target.index)}
                          strokeWidth={Math.max(1, width)}
                          opacity={asignOpacity(index, circular)}
                          fill={'none'}
                        />
                      )
                    }
                    return null
                  })}
                </Group>
              </Group>
            )
          }}
        </Sankey>
      </svg>
    </>
  )
}

export default CircularExample
