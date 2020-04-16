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
  top: 20,
  left: 50,
  right: 50,
  bottom: 50
}

const CircularExample = ({ data, width, height, margin = marginBase }) => {
  if (width < 10) return null

  let opacity = 0.7

  return (
    <svg width={width + margin.left + margin.right} height={height}>
      <Sankey
        top={margin.top}
        left={margin.left}
        data={data}
        size={[width, height]}
        nodeWidth={15}
        nodePadding={10}
        nodePaddingRatio={0.4}
        nodeId={d => d.name}
        iterations={32}>
        {({ data }) => (
          <Group>
            {
              // Hack to set color domain after <Sankey> has set depth
              color.domain(extent(data.nodes, d => d.depth))
            }

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
                <Tooltip title={node.name}>
                  <Text
                    x={node.x0 < 900 / 2 ? -10 : 20}
                    y={(node.y1 - node.y0) / 2}
                    verticalAnchor='middle'
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      textAnchor: node.x0 < 900 / 2 ? 'end' : 'start'
                    }}>
                    {node.name.substr(0, 10) + '...'}
                  </Text>
                </Tooltip>
              </Group>
            ))}

            <Group strokeOpacity={1} style={{ zIndex: -50 }}>
              {data.links.map((link, i) => {
                return (
                  <path
                    // onClick={() => opacity.push({ opacity: 0.7 })}
                    key={`link-${i}`}
                    d={link.path}
                    stroke={
                      link.circular
                        ? '#303030'
                        : CRAYOLA_COLOURS[i].hex || CRAYOLA_COLOURS[i / 5].hex
                    }
                    strokeWidth={Math.max(1, link.width < 6 ? link.width * 3 : link.width)}
                    // strokeWidth={Math.max(1, link.width)}
                    opacity={link.circular ? opacity / 2 : opacity}
                    fill={'none'}
                  />
                )
              })}
            </Group>
          </Group>
        )}
      </Sankey>
    </svg>
  )
}

export default CircularExample
