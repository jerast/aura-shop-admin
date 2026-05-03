import LoginPage from '@auth/pages/Login.page'
import { Route, Switch, Redirect } from 'wouter'

function PublicRoutes () {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}

export default PublicRoutes
