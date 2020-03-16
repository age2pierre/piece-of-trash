import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Loading } from './components/Loading'
import styles from './app.module.scss'

export const Main = React.lazy(() => import('./components/Main'))

export const App = () => (
  <div className={styles['app-container']}>
    <BrowserRouter>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route exact={true} path="/" component={Main} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  </div>
)
