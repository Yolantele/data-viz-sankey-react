import React from 'react'
import { Group } from '@vx/group'
import { Text } from '@vx/text'
import { style } from './style'
import { ANGENDA, DIMENSIONS } from './const'

const { MIN_DATA_WIDTH, BREAKPOINT } = DIMENSIONS

const Nodes = ({ data, color, opacities, setOpacities, fontColor }) => {
  const assignName = (name) => {
    if (name.length > ANGENDA) return name.substr(0, ANGENDA).toLowerCase() + '...'
    return name.substr(0, ANGENDA).toLowerCase()
  }

  return (
    <>
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
    </>
  )
}

export default Nodes
