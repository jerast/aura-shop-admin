import { Redirect } from 'wouter'
import { Route, Switch } from 'wouter'

function PrivateRoutes () {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/products" />
      </Route>
      <Route path="/products">Productos</Route>
      <Route path="/orders">Pedidos</Route>
      <Route path="/customers">Clientes</Route>
      <Route path="/discounts">Descuentos</Route>
      <Route path="/settings">Configuración</Route>
      <Route path="*">404, Not Found!</Route>
    </Switch>
  )
}

export default PrivateRoutes
