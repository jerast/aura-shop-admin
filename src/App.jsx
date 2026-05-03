import PrivateRoutes from "@app/routes/Private.routes"
import PublicRoutes from "@app/routes/Public.routes"

function App() {
 return false ? <PrivateRoutes /> : <PublicRoutes />
}

export default App
