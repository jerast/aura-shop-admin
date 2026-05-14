import Sidebar from '@app/components/Sidebar'
import useIsMobile from '@app/hooks/useMobile'

function MainLayout ({ children }) {
  const isMobile = useIsMobile()
  
  return (
    <>
      <Sidebar />
      <main className={isMobile ? "pt-16" : "lg:pl-60"}>
        <div className="max-w-7xl mx-auto p-5 lg:p-7">
          {children}
        </div>
      </main>
    </>
  )
}

export default MainLayout
