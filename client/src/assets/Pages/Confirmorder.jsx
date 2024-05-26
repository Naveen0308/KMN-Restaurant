import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import NavBar from './Navbar';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import OrderPlaced from '../Pages/Orderplaced';
import logo from "../../Images/small-logo.png";

const ConfirmOrder = () => {
  const [userDetails, setUserDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  const location = useLocation();
  const billRef = useRef(); // Ref for the bill container

  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem('user'))?.userId;
    if (storedUserId) {
      fetchUserDetails(storedUserId);
    }
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    } else {
      fetchCartItems();
    }

    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, [location.state]);

  const fetchUserDetails = (userId) => {
    fetch(`http://localhost:8082/api/get-user-details/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        toast.error('Failed to fetch user details');
      });
  };

  const fetchCartItems = () => {
    fetch('http://localhost:8082/api/cart')
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
        toast.error('Failed to fetch cart items');
      });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.foodprice, 0);
  const gstAmount = totalAmount * 0.18;
  const deliveryCharge = 50;
  const totalPayableAmount = totalAmount + gstAmount + deliveryCharge;

  const placeOrder = () => {
    const element = billRef.current;
    const options = {
      margin: [0.5, 0.5, 0.1, 0.5], // Top, right, bottom, left margins
      filename: 'OrderInvoice.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Hide the button during PDF generation
    const button = document.getElementById('place-order-button');
    button.style.display = 'none';

    html2pdf().from(element).set(options).save().then(() => {
      // Show the button again after PDF generation
      button.style.display = 'block';
      setOrderPlaced(true);
    });
  };

  if (orderPlaced) {
    return <OrderPlaced />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <br></br>
      <br></br>
      <div className="flex-grow flex justify-center items-center mt-8">
        <Card className="w-[700px]" ref={billRef}>
          <CardHeader>
            {/* <CardTitle className="text-2xl font-bold text-center">KMN Restaurant</CardTitle> */}
            <img src={logo} alt="KMN" className="h-15 w-30" />
            <CardContent className="text-sm text-center font-bold">
              15, Santhome Church Main Road, <br />
              Mylapore, Chennai-600004<br />
              GST NO: 3ZNX345GHJ87HGDWR
            </CardContent>
            <CardContent className="text-xs flex justify-between">
              <div className="font-bold">{new Date().toLocaleDateString()}</div>
              <div className="font-bold">{new Date().toLocaleTimeString()}</div>
            </CardContent>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">User Details</h2>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
              <p>Phone: {userDetails.phone}</p>
              <p>Address: {userDetails.address}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Order Details</h2>
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <br></br>
                <CardContent className="flex justify-between">
                  <div>
                    <p className="font-bold">{item.foodname}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.foodprice}</p>
                  </div>
                  <div className="font-bold text-center">
                    <p>Total Price: ${(item.quantity * item.foodprice).toFixed(2)}</p>
                  </div>
                 
                </CardContent>
              </Card>
              
              ))}
              <div className="mt-4 text-right">
                <p className="text-l font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
                <p className="text-sm">CGST (9%): ${(gstAmount / 2).toFixed(2)}</p>
                <p className="text-sm">SGST (9%): ${(gstAmount / 2).toFixed(2)}</p>
                <p className="text-sm">Delivery Charge: ${deliveryCharge.toFixed(2)}</p>
                <p className="text-l font-bold">Total Payable Amount: ${totalPayableAmount.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button id="place-order-button" onClick={placeOrder} className="hover:bg-purple-900">Place Order</Button>
          </CardFooter>
        </Card>
      </div>
      <br></br>
      <br></br>
      <Footer container className="bg-black text-white py-12">
        <div className="w-full px-4">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="mb-4 sm:mb-0">
            <Footer.Brand
                className='h-12 w-30'
                src={logo}
                alt="Flowbite Logo"
                name="Flowbite"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="About" className="text-white" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#" className="text-white">Flowbite</Footer.Link>
                  <Footer.Link href="#" className="text-white">Tailwind CSS</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" className="text-white" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#" className="text-white">Github</Footer.Link>
                  <Footer.Link href="#" className="text-white">Discord</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" className="text-white" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#" className="text-white">Privacy Policy</Footer.Link>
                  <Footer.Link href="#" className="text-white">Terms & Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider className="my-8 border-gray-600" />
          <div className="w-full sm:flex sm            .items-center sm:justify-between">
          <Footer.Copyright href="#" by=" KMN Restaurant™" year={2024} className="text-white" />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} className="text-white" />
              <Footer.Icon href="#" icon={BsInstagram} className="text-white" />
              <Footer.Icon href="#" icon={BsTwitter} className="text-white" />
              <Footer.Icon href="#" icon={BsGithub} className="text-white" />
              <Footer.Icon href="#" icon={BsDribbble} className="text-white" />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default ConfirmOrder;

  