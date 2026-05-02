import PrivateRoutes from './Private.routes'
import PublicRoutes from './Public.routes'

function Router () {
    return true ? <PrivateRoutes /> : <PublicRoutes />
}

export default Router
