import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './assets/Pages/Login.jsx'
import Signup from './assets/Pages/Signup.jsx'
import Home from './assets/Pages/Home.jsx'
import Addfood from './assets/Pages/Addfood.jsx'
import Cart from './assets/Pages/Cart.jsx'
import Tablebooking from './assets/Pages/Tablebooking.jsx'
import Tablefoodlist from './assets/Pages/Tablefoodlist.jsx';
import Confirmorder from './assets/Pages/Confirmorder.jsx';
import Profile from './assets/Pages/Profile.jsx'
import Confirmtablebooking from './assets/Pages/Confirmtablebooking.jsx';
import Myorders from './assets/Pages/Myorders.jsx';
import Foodorderslist from './assets/Pages/Foodorderslist.jsx';
import Tableorderslist from './assets/Pages/Tableorderslist.jsx';
import Customerslist from './assets/Pages/Customerslist.jsx';
import Email from './assets/Pages/Email.jsx'
function App() {
 

  return (
<Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Signup" element={<Signup />} />
    <Route path="/home" element={<Home />} />
    <Route path="/addfood" element={<Addfood />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/tablebooking" element={<Tablebooking />} />
    <Route path="/addfoodlist" element={<Tablefoodlist/>} />
    <Route path="/cart/confirmorder" element={<Confirmorder />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/tablebooking/confirm-table-booking" element={<Confirmtablebooking />} />
    <Route path="/myorders" element={<Myorders />} />
    <Route path="/food-orders-list" element={<Foodorderslist />} />
    <Route path="/table-orders-list" element={<Tableorderslist />} />
    <Route path="/customers-list" element={<Customerslist />} />
    <Route path="/home/email" element={<Email />} />
  
  </Routes>
</Router>
  )
}

export default App
