import { useEffect } from 'react'
import { Route, Switch, Redirect } from 'wouter'
import ProductsPage from '@shop/pages/Products.page'
import OrdersPage from '@orders/pages/Orders.page'
import CustomersPage from '@customers/pages/Customers.page'
// import DashboardPage from '@dashboard/pages/Dashboard.page'
// import DiscountsPage from '@discounts/pages/Discounts.page'
// import SettingsPage from '@settings/pages/Settings.page'
import MainLayout from '@app/layout/MainLayout'
import { getProducts } from '@shop/services/products.services'
import { useShopStore } from '@shop/store/useShop.store'
import { getCategories } from '@shop/services/categories.services'
import { getUsers } from '@customers/services/users.services'
import { getOrders } from '@orders/services/orders.services'
import { useUsersStore } from '@customers/store/useUsers.store'
import { useOrdersStore } from '@orders/store/useOrders.store'

function PrivateRoutes () {
  const setProducts = useShopStore(state => state.setProducts)
  const setCategories = useShopStore(state => state.setCategories)
  const setUsers = useUsersStore(state => state.setUsers)
  const setOrders = useOrdersStore(state => state.setOrders)
  const setLoading = useOrdersStore(state => state.setLoading)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const products = await getProducts()
      const categories = await getCategories()
      const users = await getUsers()
      const orders = await getOrders()
      setProducts(products)
      setCategories(categories)
      setUsers(users)
      setOrders(orders)
      setLoading(false)
    })()
  }, [])

  return (
    <MainLayout>
      <Switch>
        <Route path="/">
          <Redirect to="/orders" />
        </Route>
        {/* <Route path="/dashboard" component={DashboardPage} /> */}
        <Route path="/orders" component={OrdersPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/customers" component={CustomersPage} />
        {/* <Route path="/discounts" component={DiscountsPage} /> */}
        {/* <Route path="/settings" component={SettingsPage} /> */}
        <Route path="*">404, Not Found!</Route>
      </Switch>
    </MainLayout>
  )
}

export default PrivateRoutes
