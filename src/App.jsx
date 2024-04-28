// eslint-disable-next-line no-unused-vars
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import SignIn from './pages/signin/page'
import {useEffect} from 'react';
import {useSelector} from 'react-redux'
import { useState } from 'react';
import { AppLayout } from './layout/page';
import ServicesPage from './pages/service';
import CustomerPage from './pages/customer';
import StaffPage from './pages/staff';
import RoomsPage from './pages/rooms';
import InvoicePage from './pages/invoice';


// eslint-disable-next-line no-unused-vars
const guestRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<SignIn />} />
    </Route>
  )
)

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path='' element ={<Navigate to="/customer" replace/>}/>
      <Route path='/customer' element={<CustomerPage />} />
      <Route path='/staff' element={<StaffPage />} />
      <Route path='/rooms' element={<RoomsPage />} />
      <Route path='/service' element={<ServicesPage />} />
      <Route path='/invoice' element={<InvoicePage />} />
      <Route path="*" element={<h1>404 - Notfound</h1>} />,
    </Route>,
  )
)
function App() {
  // eslint-disable-next-line no-unused-vars
  const isLogin = useSelector((state) => state.user.isLogin)

  const [currentRouter, setCurrentRouter] = useState(isLogin ? appRouter : guestRouter)

  useEffect(() => {
    // Choose router with proper layout
    const currentRouter = !isLogin ? appRouter : guestRouter;

    setCurrentRouter(currentRouter);

    if (isLogin) {
      window.history.pushState({}, '', '/');
    }
  }, [isLogin]);

  return (
    <RouterProvider router={currentRouter} />
  )
}

export default App
