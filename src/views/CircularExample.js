import React, { useState, useEffect } from 'react'
import { Group } from '@vx/group'
import { Text } from '@vx/text'
import { scaleSequential } from 'd3-scale'
import { interpolateCool } from 'd3-scale-chromatic'
import { extent } from 'd3-array'
import { CircularSankey as Sankey } from '../comps'
import { style } from './style'

const color = scaleSequential(interpolateCool)

const MIN_DATA_WIDTH = 0
const ANGENDA = 35
const MIN_WIDTH = 600
const MIN_HEIGHT = 600
const BREAKPOINT = 900

const MARGINS = {
  top: 50,
  left: 300,
  right: 50,
  bottom: -90
}
const CircularExample = ({ data, width, height, absolutePosition, fontColor }) => {
  const [opacities, setOpacities] = useState([])

  width = width && width > MIN_WIDTH ? width : MIN_WIDTH
  height = height && height > MIN_HEIGHT ? height : MIN_HEIGHT
  absolutePosition = absolutePosition ? absolutePosition : MARGINS

  let opacity = 0.7

  const asignOpacity = (index, circular) => {
    if (opacities.length === 0 && !circular) return opacity
    if (opacities.length === 0 && circular) return opacity / 2
    if (opacities.includes(index) && !circular) return opacity
    if (opacities.includes(index) && circular) return opacity / 2
    else return 0.05
  }

  const assignName = (name) => {
    if (name.length > ANGENDA) return name.substr(0, ANGENDA).toLowerCase() + '...'
    return name.substr(0, ANGENDA).toLowerCase()
  }

  return (
    <div>
      <svg
        width={width + absolutePosition.left + absolutePosition.right}
        height={height + absolutePosition.bottom + absolutePosition.top}>
        <Sankey
          top={absolutePosition.top}
          left={absolutePosition.left}
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
                  if (y1 - y0 > MIN_DATA_WIDTH) {
                    return (
                      <Group top={y0} left={x0} key={`node-${i}`}>
                        <rect
                          onClick={() => {
                            sourceLinks.forEach((link) => linksWithHighOpacity.push(link.index))
                            targetLinks.forEach((link) => linksWithHighOpacity.push(link.index))
                            opacities.length ? setOpacities([]) : setOpacities(linksWithHighOpacity)
                          }}
                          id={`rect-${i}`}
                          width={x1 - x0}
                          height={y1 - y0}
                          fill={color(index)}
                          opacity={0.8}
                          stroke={color(index)}
                          strokeWidth={2}
                        />
                        <Text
                          x={x0 < BREAKPOINT / 2 ? -5 : 20}
                          y={(y1 - y0) / 2}
                          verticalAnchor='middle'
                          fill={fontColor}
                          style={{
                            ...style.font,
                            textAnchor: x0 < BREAKPOINT / 2 ? 'end' : 'start'
                          }}>
                          {assignName(name)}
                        </Text>
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
    </div>
  )
}

export default CircularExample
