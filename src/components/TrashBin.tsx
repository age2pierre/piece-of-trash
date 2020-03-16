import React from 'react'
import { exhaustiveCheck } from '../services/exhaustiveCheck'
import { TrashType } from './Main'
import styles from './trashbin.module.scss'

export const TrashBin = (props: {
  type: TrashType
  index: number
  w: number
  h: number
}) => {
  const colorClassName =
    props.type === 'BLUE_TRASH'
      ? styles['blue-trash']
      : props.type === 'GREEN_TRASH'
      ? styles['green-trash']
      : props.type === 'RED TRASH'
      ? styles['red-trash']
      : props.type === 'YELLOW_TRASH'
      ? styles['yellow-trash']
      : exhaustiveCheck(props.type)

  return (
    <div
      className={`${styles['bin-trash']} ${colorClassName}`}
      key={props.type}
      style={{
        width: props.w,
        height: props.h,
        left: props.index * props.w,
      }}
    />
  )
}
