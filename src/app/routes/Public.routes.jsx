import { Route, Switch, Redirect } from 'wouter'

function PublicRoutes () {
    return (
        <Switch>
            <Route path="/login">Login</Route>
            <Route path="*">
                <Redirect to="/login" />
            </Route>
        </Switch>
    )
}
  
export default PublicRoutes
