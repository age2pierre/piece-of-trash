import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Loading } from './Loading'

export const LandingPage = React.lazy(() => import('../pages/Main'))

export const App = () => (
  <BrowserRouter>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
        <Route exact={true} path="/loading" component={Loading} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)
