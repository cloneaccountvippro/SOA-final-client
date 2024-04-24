// eslint-disable-next-line no-unused-vars
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import SignIn from './pages/signin/page'
// eslint-disable-next-line no-unused-vars
import {useEffect} from 'react';
import {useSelector} from 'react-redux'
import { AppLayout } from './layout/page';

// eslint-disable-next-line no-unused-vars
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<SignIn />} />
    </Route>
  )
)
function App() {
  // eslint-disable-next-line no-unused-vars
  const isLogin = useSelector((state) => state.user.isLogin)

  return (
    <AppLayout></AppLayout>
  )
}

export default App
