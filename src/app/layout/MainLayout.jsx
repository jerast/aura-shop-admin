import Router from '../routes/Router'
import Sidebar from '../components/Sidebar'

function MainLayout () {
  return (
    <>
      <Sidebar />
      <main className="lg:pl-60">
        <div className="p-6 lg:p-8">
          <Router />
        </div>
      </main>
    </>
  )
}

export default MainLayout
