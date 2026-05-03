import Router from '@app/routes/Router'
import Sidebar from '@app/components/Sidebar'
import Notifier from '@app/components/Nofitier'

function MainLayout () {
  return (
    <>
      <Sidebar />
      <main className="lg:pl-60">
        <div className="p-6 lg:p-8">
          <Router />
        </div>
      </main>
      <Notifier />
    </>
  )
}

export default MainLayout
