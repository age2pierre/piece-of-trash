import React from 'react'
import useWindowDimensions from '~services/useWindowDimensions'
import { HUD } from './HUD'
import { Stage } from './Stage'
import { Circle } from './Circle'
import { TrashBin } from './TrashBin'

export const TRASH_TYPES = [
  'BLUE_TRASH',
  'GREEN_TRASH',
  'RED TRASH',
  'YELLOW_TRASH',
] as const

export type TrashType = typeof TRASH_TYPES[number]

export const Main = () => {
  const windowDim = useWindowDimensions()
  const BIN_HEIGHT = windowDim.height / 5
  const BIN_WIDTH = windowDim.width / TRASH_TYPES.length

  return (
    <>
      <Stage>
        <Circle trashType="GREEN_TRASH" />
      </Stage>
      <HUD score={0} />
      <div>
        {TRASH_TYPES.map((el, index) => (
          <TrashBin
            index={index}
            type={el}
            key={el}
            h={BIN_HEIGHT}
            w={BIN_WIDTH}
          />
        ))}
      </div>
    </>
  )
}

export default Main
