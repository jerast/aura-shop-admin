import { useEffect } from 'react'
import { Route, Switch, Redirect } from 'wouter'
// import DashboardPage from '@dashboard/pages/Dashboard.page'
import ProductsPage from '@shop/pages/Products.page'
import OrdersPage from '@orders/pages/Orders.page'
import CustomersPage from '@customers/pages/Customers.page'
import DiscountsPage from '@discounts/pages/Discounts.page'
import MainLayout from '@app/layout/MainLayout'
import { getProducts } from '@shop/services/products.services'
import { useShopStore } from '@shop/store/useShop.store'
import { getCategories } from '@shop/services/categories.services'
// import SettingsPage from '@settings/pages/Settings.page'

function PrivateRoutes () {
  const setProducts = useShopStore(state => state.setProducts)
  const setCategories = useShopStore(state => state.setCategories)

  useEffect(() => {
    (async () => {
      const products = await getProducts()
      const categories = await getCategories()
      setProducts(products)
      setCategories(categories)
      console.log(JSON.stringify(products[0]));
      console.log(JSON.stringify(categories[0]));
      
    })()
  }, [])

  return (
    <MainLayout>
      <Switch>
        <Route path="/">
          <Redirect to="/products" />
        </Route>
        {/* <Route path="/dashboard" component={DashboardPage} /> */}
        <Route path="/products" component={ProductsPage} />
        <Route path="/orders" component={OrdersPage} />
        <Route path="/customers" component={CustomersPage} />
        <Route path="/discounts" component={DiscountsPage} />
        {/* <Route path="/settings" component={SettingsPage} /> */}
        <Route path="*">404, Not Found!</Route>
      </Switch>
    </MainLayout>
  )
}

export default PrivateRoutes
