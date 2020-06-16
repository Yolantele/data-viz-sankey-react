import React from 'react'
import { Group } from '@vx/group'
import { DIMENSIONS } from './const'

const { MIN_DATA_WIDTH } = DIMENSIONS

const Links = ({ data, color, opacities }) => {
  let opacity = 0.7

  const asignOpacity = (index, circular) => {
    if (opacities.length === 0 && !circular) return opacity
    if (opacities.length === 0 && circular) return opacity / 2
    if (opacities.includes(index) && !circular) return opacity
    if (opacities.includes(index) && circular) return opacity / 2
    else return 0.05
  }
  return (
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
  )
}

export default Links
