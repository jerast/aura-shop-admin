import { Route, Switch, Redirect } from 'wouter'
import DashboardPage from '@dashboard/pages/Dashboard.page'
import ProductsPage from '@products/pages/Products.page'
import OrdersPage from '@orders/pages/Orders.page'
import CustomersPage from '@customers/pages/Customers.page'
import DiscountsPage from '@discounts/pages/Discounts.page'
import SettingsPage from '@settings/pages/Settings.page'

function PrivateRoutes () {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/orders" component={OrdersPage} />
      <Route path="/customers" component={CustomersPage} />
      <Route path="/discounts" component={DiscountsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="*">404, Not Found!</Route>
    </Switch>
  )
}

export default PrivateRoutes
