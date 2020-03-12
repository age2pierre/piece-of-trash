import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Loading } from './Loading'

export const Main = React.lazy(() => import('../pages/Main'))

export const App = () => (
  <BrowserRouter>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact={true} path="/" component={Main} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)
