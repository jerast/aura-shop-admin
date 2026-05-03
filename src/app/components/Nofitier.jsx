import { Toaster, toast } from 'sonner'

function Notifier () {
  return (
    <>
      <Toaster closeButton />
      <button onClick={() => toast('My first toast')}>Give me a toast</button>
    </>
  )
}

export default Notifier
