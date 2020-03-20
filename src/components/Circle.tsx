import React, { useRef } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { useFrame } from '../services/useFrame'
import { TrashType } from './Main'
import { exhaustiveCheck } from '../services/exhaustiveCheck'

import styles from './circle.module.scss'

export const Circle = (props: {
  trashType: TrashType
  onDrop: (e: { x: number; y: number }) => void
}) => {
  const [{ x, y }, set] = useSpring<{
    x: number
    y: number
  }>(() => ({
    x: -40,
    y: -80,
    config: config.default,
  }))
  // ref act as local state, but does not retriggering render
  const pos = useRef(0)
  const downRef = useRef([false, false])

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(dragState => {
    const {
      down,
      movement: [mx],
      xy: [x, y],
    } = dragState

    // put mouse pressed state in circular buffer
    downRef.current = [down, downRef.current[0]]
    const [isDown, wasDown] = downRef.current

    // check if mouse button was just released
    if (isDown === false && wasDown === true) {
      props.onDrop({ x, y })
    }

    // when dragging take control of the div target postion
    if (isDown) {
      set({ x: mx - 40, y: y - 40 })
    }
  })

  // increase the trash position down every frame
  useFrame(delta => {
    const [isDown] = downRef.current
    // only when NOT dragging take control of the div target postion
    if (!isDown) {
      set({ y: pos.current - 40, x: -40 })
    }
    pos.current += delta * 0.05
  })

  const className =
    props.trashType === 'BLUE_TRASH'
      ? styles['blue-trash']
      : props.trashType === 'GREEN_TRASH'
      ? styles['green-trash']
      : props.trashType === 'RED TRASH'
      ? styles['red-trash']
      : props.trashType === 'YELLOW_TRASH'
      ? styles['yellow-trash']
      : exhaustiveCheck(props.trashType)

  return (
    <animated.div className={styles.circle} style={{ x, y }}>
      <svg width={80} height={80}>
        <circle {...bind()} cx={40} cy={40} r={38} className={className} />
      </svg>
    </animated.div>
  )
}
