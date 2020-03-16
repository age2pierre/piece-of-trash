import React, { ReactNode } from 'react'
import styles from '../app.module.scss'

/**
 * This component's goal is to offset trash to the middle of the screen
 */
export const Stage = (props: { children: ReactNode }) => {
  return <div className={styles.stage}>{props.children}</div>
}
