import AuthLayout from '@app/layout/AuthLayout'
import LoginPage from '@auth/pages/Login.page'
import { Route, Switch, Redirect } from 'wouter'

function PublicRoutes () {
  return (
    <AuthLayout>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </AuthLayout>
  )
}

export default PublicRoutes
