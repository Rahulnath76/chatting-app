import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App() {
 
  return (
    <div className='w-full h-full'>
      {/* <div className='flex items-center text-4xl w-full'>
        Hello world
      </div> */}
    
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<Login />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
