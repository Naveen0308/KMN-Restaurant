import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";


const Signup = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/');
  };

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignupClick = async () => {
    try {
      const { name, username, email, password, confirmPassword, phone, address } = formData;
  
      // Log the form data to check values
      console.log('Form Data:', formData);
  
      if (!name || !username || !email || !password || !confirmPassword || !phone || !address) {
        alert('Please fill in all fields.');
        return;
      }
  
      if (password !== confirmPassword) {
        // Display an error message to the user
        alert('Passwords do not match. Please check your passwords and try again.');
        return;
      }
  
      // Send a POST request to the backend API for signup
      const response = await fetch(`http://localhost:8082/api/signup`, {  // Updated port to 8082
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          confirmPassword,
          phone,
          address,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Successful signup, redirect to the desired page
        navigate('/');
      } else {
        // Handle other signup errors
        alert(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const images = [image1, image2, image3, image4, image5];

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100vh', paddingLeft: '180px' }}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" placeholder="Username" value={formData.username} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="text" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" type="text" placeholder="Address" value={formData.address} onChange={handleInputChange} />
          </div>
        </CardContent>
        <div className="flex items-center justify-center space-x-5">
          <label htmlFor="login" className="text-sm text-blue-500 cursor-pointer" onClick={handleLoginClick}>
            Already Have an Account? Login
          </label>
        </div>
        <div className="h-4"></div> {/* Add empty div for spacing */}
        <CardFooter>
          <Button onClick={handleSignupClick}>Sign Up</Button>
        </CardFooter>
      </Card>
      <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
        <Carousel className="w-full max-w-xl">
          <CarouselContent className="h-[600px]">
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <CardContent className="flex items-center justify-center h-full">
                  <img src={image} alt={`Image ${index + 1}`} style={{ objectFit: 'contain', maxWidth: '600%', maxHeight: '100%' }} />
                </CardContent>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      
    </div>
  );
};

export default Signup;
