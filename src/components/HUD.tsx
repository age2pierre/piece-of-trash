import React from 'react'
import styles from '../app.module.scss'

export const HUD = (props: { score: number }) => {
  return (
    <div className={styles['hud']}>
      <h2>YOU PIECE OF TRASH</h2>
      <p>{`Score : ${props.score}`}</p>
    </div>
  )
}
