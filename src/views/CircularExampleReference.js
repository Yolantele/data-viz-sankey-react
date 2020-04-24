import React from 'react'
import { Group } from '@vx/group'
import { Tooltip, Typography } from 'antd'
import { Text } from '@vx/text'
import { scaleSequential } from 'd3-scale'
import { interpolateCool } from 'd3-scale-chromatic'
import { format as d3format } from 'd3-format'
import { extent } from 'd3-array'
import { CircularSankey as Sankey } from '../comps'
import { CRAYOLA_COLOURS } from '../const'

const color = scaleSequential(interpolateCool)
const format = d3format(',d')

const marginBase = {
  top: 30,
  left: 130,
  right: 50,
  bottom: 40
}

const CircularExample = ({ data, width, height, margin = marginBase }) => {
  if (width < 10) return null

  let opacity = 0.7

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.bottom + margin.top}>
      <Sankey
        top={margin.top}
        left={margin.left}
        data={data}
        size={[width, height]}
        nodeWidth={10}
        nodePadding={25}
        nodePaddingRatio={0.5}
        nodeId={d => {
          // console.log('node ----', d)
          return d.name
        }}
        iterations={3}>
        {({ data }) => {
          console.log('data links ---', data)
          return (
            <Group>
              {// Hack to set color domain after <Sankey> has set depth
              color.domain(extent(data.nodes, d => d.depth))}

              {data.nodes.map((node, i) => (
                <Group top={node.y0} left={node.x0} key={`node-${i}`}>
                  <rect
                    id={`rect-${i}`}
                    width={node.x1 - node.x0}
                    height={node.y1 - node.y0}
                    // fill={color(node.depth)}
                    fill={'#303030'}
                    opacity={0.8}
                    stroke='#303030'
                    strokeWidth={2}
                  />
                  <Tooltip title={node.name.toLowerCase()}>
                    <Text
                      x={node.x0 < 900 / 2 ? -5 : 20}
                      y={(node.y1 - node.y0) / 2}
                      verticalAnchor='middle'
                      style={{
                        fontSize: 12,
                        textAnchor: node.x0 < 900 / 2 ? 'end' : 'start'
                      }}>
                      {node.name.length > 15
                        ? node.name.substr(2, 15).toLowerCase() + '...'
                        : node.name.substr(2, 15).toLowerCase()}
                    </Text>
                  </Tooltip>
                </Group>
              ))}

              <Group strokeOpacity={1}>
                {data.links.map((link, i) => {
                  return (
                    <path
                      onClick={() => console.log('link---', link)}
                      onHover={() => console.log('onhover link---', link)}
                      key={`link-${i}`}
                      d={link.path}
                      stroke={
                        link.circular
                          ? '#303030'
                          : CRAYOLA_COLOURS[i].hex || CRAYOLA_COLOURS[i / 5].hex
                      }
                      strokeWidth={Math.max(1, link.width)}
                      opacity={link.circular ? opacity / 2 : opacity}
                      fill={'none'}
                    />
                  )
                })}
              </Group>
            </Group>
          )
        }}
      </Sankey>
    </svg>
  )
}

export default CircularExample