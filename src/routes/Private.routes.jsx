import { Route, Switch } from 'wouter'

function PrivateRoutes () {
    return (
        <Switch>
            <Route path="/">Home</Route>
            <Route path="/about">About</Route>
            <Route path="*">404, Not Found!</Route>
        </Switch>
    )
}
  
export default PrivateRoutes
