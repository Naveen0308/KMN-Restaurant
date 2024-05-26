import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { Footer } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Tablebooking = () => {
  const navigate = useNavigate();

  // State to track selected date, timing, and other inputs
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTiming, setSelectedTiming] = useState(null);
  const [name, setName] = useState('');
  const [members, setMembers] = useState('');


  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);



  // Function to handle booking
  const handleBookTable = () => {
    const data = {
      name,
      members,
      date: selectedDate,
      timing: selectedTiming,
      userId:user?.userId
    };

    fetch('http://localhost:8082/api/add-to-table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Table booked successfully:', data);
      // Handle successful booking, e.g., navigate to another page or show a success message
      navigate('/tablebooking/confirm-table-booking');
    })
    .catch((error) => {
      console.error('Error booking table:', error);
      // Handle errors, e.g., show an error message to the user
    });
  };

  const handleAddFoodClick = () => {
    navigate('/addfoodlist');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <NavBar />
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <CardTitle>Table Booking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</Label>
            <Input id="name" name="name" type="text" placeholder="Name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="members" className="block text-sm font-medium text-gray-700">Members:</Label>
            <Input id="members" name="members" type="text" placeholder="Members Count" className="input" value={members} onChange={(e) => setMembers(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-gray-700">Date:</Label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]} // Disable past dates
              value={selectedDate}
              onChange={event => setSelectedDate(event.target.value)}
              className="input border border-gray-300 p-2 rounded-md"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-gray-700">Slot Timing:</Label>
            <Select onValueChange={(value) => setSelectedTiming(value)}>
              <SelectTrigger className="w-full border border-gray-300 p-2 rounded-md">
                <SelectValue placeholder="Select Timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Timing</SelectLabel>
                  <SelectItem value="12:00pm - 2:00pm">12:00pm - 2:00pm</SelectItem>
                  <SelectItem value="2:00pm - 4:00pm">2:00pm - 4:00pm</SelectItem>
                  <SelectItem value="4:00pm - 6:00pm">4:00pm - 6:00pm</SelectItem>
                  <SelectItem value="6:00pm - 8:00pm">6:00pm - 8:00pm</SelectItem>
                  <SelectItem value="8:00pm - 10:00pm">8:00pm - 10:00pm</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleAddFoodClick}>Add Foods</Button>
          <Button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleBookTable}>Book Table</Button>
        </CardFooter>
      </Card>
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
};

export default Tablebooking;
