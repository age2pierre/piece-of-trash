import { produce } from 'immer'
import React, { useReducer, useRef } from 'react'
import { exhaustiveCheck } from '../services/exhaustiveCheck'
import useWindowDimensions from '../services/useWindowDimensions'
import { Circle } from './Circle'
import { HUD } from './HUD'
import { Stage } from './Stage'
import { TrashBin } from './TrashBin'

export const TRASH_TYPES = [
  'BLUE_TRASH',
  'GREEN_TRASH',
  'RED TRASH',
  'YELLOW_TRASH',
] as const

export type TrashType = typeof TRASH_TYPES[number]

function randomItem<T>(array: ArrayLike<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

interface GameState {
  score: number
  circles: Record<string, TrashType>
}

type GameAction =
  | {
      type: 'ADD_NEW_CIRCLE'
    }
  | {
      type: 'DROP_CIRCLE'
      x: number
      y: number
      kind: TrashType
      key: string
    }
  | {
      type: 'LOST_CIRCLE'
      key: string
    }

export const Main = () => {
  const windowDim = useWindowDimensions()
  const BIN_HEIGHT = windowDim.height / 5
  const BIN_WIDTH = windowDim.width / TRASH_TYPES.length

  const itemCounter = useRef(0)

  const [{ score, circles }, dispatch] = useReducer(
    (state: GameState, action: GameAction) => {
      switch (action.type) {
        case 'ADD_NEW_CIRCLE':
          return produce(state, draft => {
            draft.circles[String(++itemCounter.current)] = randomItem(
              TRASH_TYPES,
            )
          })
        case 'DROP_CIRCLE': {
          const { x, y, kind, key } = action
          console.log(`DROP_CIRCLE`)
          console.dir(action)
          // if it was dropped above the bin, do nothing
          if (y <= windowDim.height - BIN_HEIGHT) {
            return state
          }
          const binBounds = TRASH_TYPES.map((el, index) => ({
            kind: el,
            min: index * BIN_WIDTH,
            max: (index + 1) * BIN_WIDTH,
          }))
          const binKind: TrashType | undefined = binBounds.filter(
            el => el.min <= x && x <= el.max,
          )[0]?.kind
          // if dropped outsite the screen, do nothing
          if (binKind == null) {
            return state
          }
          // dropped in the right bin
          if (binKind === kind) {
            return produce(state, draft => {
              draft.score += 10
              delete draft.circles[key]
            })
          } else {
            // dropped it in the wrong bin
            return produce(state, draft => {
              draft.score -= 5
              delete draft.circles[key]
            })
          }
        }
        case 'LOST_CIRCLE':
          return produce(state, draft => {
            draft.score -= 7
            delete draft.circles[action.key]
          })
        default:
          exhaustiveCheck(action)
          return state
      }
    },
    {
      score: 0,
      circles: {
        [String(++itemCounter.current)]: randomItem(TRASH_TYPES),
      },
    },
  )

  // useInterval(() => dispatch({ type: 'ADD_NEW_CIRCLE' }), 3000)
  return (
    <>
      <Stage>
        {Object.entries(circles).map(([key, kind]) => (
          <Circle
            key={key}
            trashType={kind}
            onDrop={({ x, y }) => {
              // lostBound={windowDim.height - BIN_HEIGHT}
              // onLost={() => dispatch({ type: 'LOST_CIRCLE', key })}
              dispatch({
                type: 'DROP_CIRCLE',
                key,
                x,
                y,
                kind: kind,
              })
            }}
          />
        ))}
      </Stage>
      <HUD score={score} />
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
