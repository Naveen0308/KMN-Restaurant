import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { Button } from "@/components/ui/button";
import { Footer } from "flowbite-react";
import { toast } from 'sonner';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import OrderPlaced from '../Pages/Orderplaced';
import logo from "../../Images/small-logo.png";

const Confirmtablebooking = () => {
  const [userDetails, setUserDetails] = useState({});
  const [bookingDetails, setBookingDetails] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Fetch user and booking details using userId from local storage
    const storedUserId = JSON.parse(localStorage.getItem('user'))?.userId;
    if (storedUserId) {
      fetchUserDetails(storedUserId);
      fetchTableBookingDetails(storedUserId);
    }
  }, []);

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

  const fetchTableBookingDetails = (userId) => {
    fetch(`http://localhost:8082/api/get-table-booking/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setBookingDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching booking details:', error);
        if (error.message.includes('Unexpected end of JSON input')) {
          toast.error('No booking found for this user');
        } else {
          toast.error('Failed to fetch booking details');
        }
      });
  };

  const handleBookTableClick = () => {
    // Implement your logic to place the order
    // This function will be triggered when the "Place Order" button is clicked
    // You can send the order details to the backend to process the order
    console.log('Placing order...');
    // On successful order placement, show the OrderPlaced component
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return <OrderPlaced />;
  }

  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <div className="flex-grow flex justify-center items-center mt-8">
        <Card className="w-[500px]">
          <CardHeader>
            {/* <CardTitle className="text-2xl font-bold text-center">KMN Restaurant</CardTitle> */}
            <img src={logo} alt='logo' />
            <CardContent className="text-sm text-center font-bold">
              15, Santhome Church Main Road, <br />
              Mylapore, Chennai-600004<br />
              GST NO: 3ZNX345GHJ87HGDWR
            </CardContent>
            {/* Display current date and time */}
            <CardContent className="text-xs flex justify-between">
              <div>Date: {new Date().toLocaleDateString()}</div>
              <div>Time: {new Date().toLocaleTimeString()}</div>
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
              <h2 className="text-xl font-bold mb-2">Table Details</h2>
              <p>Diner Name: {bookingDetails.name}</p>
              <p>Members Count: {bookingDetails.members}</p>
              <p>Dining Date: {bookingDetails.date}</p>
              <p>Slot Timing: {bookingDetails.timing}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleBookTableClick} className="hover:bg-purple-900">Book Table</Button>
          </CardFooter>
        </Card>
      </div>
      <br />
      <br />
      <br />
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
          <div className="w-full sm:flex sm:items-center sm:justify-between">
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

export default Confirmtablebooking;
