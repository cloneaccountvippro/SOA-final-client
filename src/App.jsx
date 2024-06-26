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
import StaffPage from './pages/staff/component/page';
import RoomsPage from './pages/rooms';
import InvoicePage from './pages/invoice';
import ChangePassword from './pages/reset_password';
import StaffDetailPage from './pages/staff/component/detail';
// eslint-disable-next-line no-unused-vars
const guestRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<SignIn />} />
      <Route path="/reset" element={<ChangePassword />} />
      <Route path="*" element={<h1>404 - Notfound</h1>} />
    </Route>
  )
)

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path='' element ={<Navigate to="/staff" replace/>}/>
      <Route path='/customer' element={<CustomerPage />} />
      <Route path='/staff'>
        <Route path=":id" element={<StaffDetailPage />} />
        <Route path="" element={<StaffPage />}/>
      </Route>
      <Route path='/booking_rooms' element={<RoomsPage />} />
      <Route path='/rooms' element={<ServicesPage />} />
      <Route path='/invoice' element={<InvoicePage />} />
      <Route path="*" element={<h1>404 - Notfound</h1>} />,
    </Route>,
  )
)
function App() {
  const isLogin = useSelector((state) => state.user.isLogin)

  const [currentRouter, setCurrentRouter] = useState(isLogin ? appRouter : guestRouter)

  useEffect(() => {
    const currentRouter = isLogin ? appRouter : guestRouter;

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
