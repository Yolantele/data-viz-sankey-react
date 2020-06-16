import React, { useState } from 'react'
import { Group } from '@vx/group'
import { scaleSequential } from 'd3-scale'
import { interpolateSpectral } from 'd3-scale-chromatic'
import { extent } from 'd3-array'
import { CircularSankey as Sankey, Links, Nodes } from '../comps'
import { DIMENSIONS } from '../comps/const'

const color = scaleSequential(interpolateSpectral)
const { MIN_WIDTH, MIN_HEIGHT, MARGINS } = DIMENSIONS

const CircularExample = ({ data, width, height, absolutePosition, fontColor }) => {
  const [opacities, setOpacities] = useState([])

  width = width && width > MIN_WIDTH ? width : MIN_WIDTH
  height = height && height > MIN_HEIGHT ? height : MIN_HEIGHT
  absolutePosition = absolutePosition ? absolutePosition : MARGINS

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
                <Nodes {...{ data, color, opacities, setOpacities, fontColor }} />
                <Links {...{ data, color, opacities }} />
              </Group>
            )
          }}
        </Sankey>
      </svg>
    </div>
  )
}

export default CircularExample
