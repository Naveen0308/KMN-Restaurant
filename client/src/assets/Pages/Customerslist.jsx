import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { Footer } from "flowbite-react";
import { toast } from 'sonner';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "../../Images/small-logo.png";
const Customerslist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend API
    fetch('http://localhost:8082/api/get-all-users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <br></br>
      <br></br>
      <br></br>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Customers List</h1>
        <div className="flex flex-col space-y-4">
          {users.map(user => (
            <Card key={user.id} className="bg-white shadow-md rounded-lg p-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <button className="bg-purple-900 hover:bg-black text-white px-4 py-2 rounded-md">View Food Orders</button>
                <button className="bg-purple-900 hover:bg-black text-white px-4 py-2 rounded-md">View Table Orders</button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
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
                <Footer.Title title="Legal" className="text-white"/>
                <Footer.LinkGroup col>
                  <Footer.Link href="#" className="text-white">Privacy Policy</Footer.Link>
                  <Footer.Link href="#" className="text-white">Terms &amp; Conditions</Footer.Link>
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
}

export default Customerslist;
