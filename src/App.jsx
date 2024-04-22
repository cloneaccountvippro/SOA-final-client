import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import SignIn from './pages/signin/page'
import {useEffect} from 'react';
import {useSelector} from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<SignIn />} />
    </Route>
  )
)
function App() {
  const isLogin = useSelector((state) => state.user.isLogin)

  return (
    <RouterProvider router={router}/>
  )
}

export default App
