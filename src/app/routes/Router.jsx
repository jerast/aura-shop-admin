import PublicRoutes from './Public.routes'
import PrivateRoutes from './Private.routes'

function Router () {
    return true ? <PrivateRoutes /> : <PublicRoutes />
}

export default Router
