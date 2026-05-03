import PrivateRoutes from '@app/routes/Private.routes'
import Sidebar from '@app/components/Sidebar'
import Notifier from '@app/components/Nofitier'

function MainLayout ({ children }) {
  return (
    <>
      <Sidebar />
      <main className="lg:pl-60">
        <div className="max-w-7xl mx-auto p-5 lg:p-7">
          {children}
        </div>
      </main>
      <Notifier />
    </>
  )
}

export default MainLayout
