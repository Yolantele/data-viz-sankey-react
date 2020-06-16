import React, { useState } from 'react'
import { Group } from '@vx/group'
import { scaleSequential } from 'd3-scale'
import { interpolateSpectral } from 'd3-scale-chromatic'
import { extent } from 'd3-array'
import { CircularSankey as Sankey, Links, Nodes } from '../comps'
import { DIMENSIONS } from '../comps/const'
import { useTooltip, TooltipWithBounds } from '@vx/tooltip'
import { localPoint } from '@vx/event'
const color = scaleSequential(interpolateSpectral)
const { MIN_WIDTH, MIN_HEIGHT, MARGINS } = DIMENSIONS

const CircularExample = ({
  data,
  width,
  height,
  absolutePosition,
  fontColor,
  fontSize,
  unitString
}) => {
  const [opacities, setOpacities] = useState([])
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip
  } = useTooltip()

  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event)
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum
    })
  }

  width = width && width > MIN_WIDTH ? width : MIN_WIDTH
  height = height && height > MIN_HEIGHT ? height : MIN_HEIGHT
  absolutePosition = absolutePosition ? absolutePosition : MARGINS

  const { left, right, top, bottom } = absolutePosition
  return (
    <div>
      <svg width={width + left + right} height={height + bottom + top}>
        <Sankey
          top={top}
          left={left}
          data={data}
          size={[width, height]}
          nodeWidth={10}
          nodePadding={25}
          nodePaddingRatio={0.6}
          nodeId={(d) => d.name}
          iterations={3}>
          {({ data }) => {
            return (
              <Group>
                {
                  // Hack to set color domain after <Sankey> has set depth
                  color.domain(extent(data.nodes, (d) => d.depth))
                }
                <Nodes
                  {...{
                    data,
                    color,
                    opacities,
                    setOpacities,
                    fontColor,
                    fontSize,
                    handleMouseOver,
                    hideTooltip
                  }}
                />
                <Links {...{ data, color, opacities }} />
              </Group>
            )
          }}
        </Sankey>
      </svg>
      {tooltipOpen && (
        <TooltipWithBounds key={Math.random()} top={tooltipTop} left={tooltipLeft}>
          <strong>{tooltipData.name}:</strong>
          <br />
          {` ${tooltipData.value} ${unitString}`}
        </TooltipWithBounds>
      )}
    </div>
  )
}

export default CircularExample
