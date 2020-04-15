import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as d3Sankey from 'd3-sankey'
import * as d3Circular from 'd3-sankey-circular'
const size = {
  width: 700,
  height: 600
}

const getMousePosition = event => {
  const CTM = event.target.getScreenCTM()

  return {
    x: (event.clientX - CTM.e) / CTM.a,
    y: (event.clientY - CTM.f) / CTM.d
  }
}

const Rect = ({ index, x0, x1, y0, y1, name, length, colors }) => {
  return (
    <>
      <rect
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
        fill={colors(index / length)}
        data-index={index}
      />
      <text
        x={x0 < size.width / 2 ? x1 - 20 : x0 + 20}
        y={(y1 + y0) / 2}
        style={{
          fill: d3.rgb(colors(index / length)).darker(),
          alignmentBaseline: 'middle',
          fontSize: 12,
          //   textAnchor: x0 < size.width / 2 ? 'start' : 'end',
          textAnchor: x0 < size.width / 2 ? 'end' : 'start',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
        {`${name.substr(0, 2)}`}
      </text>
    </>
  )
}

const Link = ({ data, width, length, colors }) => {
  const link = d3Sankey.sankeyLinkHorizontal()
  return (
    <>
      <defs>
        <linearGradient
          id={`gradient-${data.index}`}
          gradientUnits='userSpaceOnUse'
          x1={data.source.x1}
          x2={data.target.x0}>
          <stop offset='0' stopColor={colors(data.source.index / length)} />
          <stop offset='100%' stopColor={colors(data.target.index / length)} />
        </linearGradient>
      </defs>
      <path
        d={link(data)}
        fill={'none'}
        stroke={`url(#gradient-${data.index})`}
        strokeOpacity={0.5}
        strokeWidth={width}
      />
    </>
  )
}

const Sankey = props => {
  console.log('saneky justify ----', size)
  const dragElement = useRef(null)
  const graph = useRef(null)
  const offset = useRef(null)

  const colors = props.edit ? d3.interpolateWarm : d3.interpolateCool
  const sankey = d3Circular
    .sankeyCircular()
    .nodeWidth(10)
    .nodePadding(30)
    .extent([
      [0, 0],
      [size.width, size.height]
    ])

  const onMouseUp = e => {
    dragElement.current = null
  }

  const onMouseDown = e => {
    if (e.target.tagName === 'rect') {
      dragElement.current = e.target
      offset.current = getMousePosition(e)
      offset.current.y -= parseFloat(e.target.getAttributeNS(null, 'y'))
    }
  }

  const onMouseMove = e => {
    if (dragElement.current) {
      const coord = getMousePosition(e)
      dragElement.current.setAttributeNS(null, 'y', coord.y - offset.current.y)
    }
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  if (props.data) {
    graph.current = sankey(props.data)
    const { links, nodes } = props.data

    return (
      <svg width={size.width} height={size.height}>
        <g>
          {links.map((d, i) => (
            <Link data={d} width={d.width} length={nodes.length} colors={colors} />
          ))}
        </g>
        <g>
          {nodes.map((d, i) => (
            <Rect
              index={d.index}
              x0={d.x0}
              x1={d.x1}
              y0={d.y0}
              y1={d.y1}
              name={d.name}
              value={d.value}
              length={nodes.length}
              colors={colors}
            />
          ))}
        </g>
      </svg>
    )
  }

  return <div>Loading</div>
}

export default Sankey
