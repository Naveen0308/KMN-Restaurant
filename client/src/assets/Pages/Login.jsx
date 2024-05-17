import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import UserContext from '../../UserContext';
import { useContext, useState } from 'react';


const Login = () => {
    const navigate = useNavigate();
    const handleSignupClick = () => {
        navigate('/Signup');
    };

    const {userId, setUserId} = useContext(UserContext);
    const {emailId,setEmailId}=useContext(UserContext);
    console.log(userId);  
    console.log(emailId)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      

      const handleLoginClick = async () => {
        try {
          const { email, password } = formData;
          const response = await fetch(`http://localhost:8082/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log("logged in user data:",data);
            
            // Update the context with the logged-in user's email
            setEmailId(data.email);
            setUserId(data.userId);
            navigate('/home');
          } else {
            const data = await response.json();
            alert(data.error || 'Login failed');
          }
        } catch (error) {
          console.error(error);
        }
      };

      const handleAdminClick = async () => {
        try {
            const enteredEmail = document.getElementById('email1').value;
            const enteredPassword = document.getElementById('password1').value;
    
            if (enteredEmail === 'admin@gmail.com' && enteredPassword === 'Positivity@123') {
                // Assuming admin user ID is 0
                setUserId(0);
                setEmailId(enteredEmail);
                navigate('/home');
            } else {
                alert('Invalid admin username or password');
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const images = [image1, image2, image3, image4, image5];

    return (
        <div style={{ display: 'flex', alignItems: 'center', height: '100vh', paddingLeft: '180px' }}>
            <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginRight: 'auto', fontFamily: 'Roboto, sans-serif' }}>KMN Restaurant</h1>
            </div>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>LogIn</CardTitle>
                                <CardDescription>Login to your account here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Email</Label>
                                    <Input name="email" id="email"  placeholder="Email" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" id="password"  placeholder="Password" value={formData.password} onChange={handleInputChange} />
                                </div>
                            </CardContent>
                            <div className="flex items-center justify-center space-x-5">
                                <label htmlFor="signup" className="text-sm font-small text-blue-500 leading-none cursor-pointer" onClick={handleSignupClick}>
                                    Don't Have an Account? Signup
                                </label>
                            </div>
                            <div className="h-4"></div>
                            <div className="flex items-center justify-center space-x-2">
                                <Checkbox id="terms" />
                                <label htmlFor="terms" className="text-sm font-medium leading-none">
                                    Remember me
                                </label>
                            </div>
                            <CardFooter>
                                <Button onClick={handleLoginClick}>Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="admin">
                        <Card>
                            <CardHeader>
                                <CardTitle>Admin Management Control</CardTitle>
                                <CardDescription>Admin Users Login to your Account here</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email1">Email</Label>
                                    <Input id="email1" type="text" placeholder="Email" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password1">Password</Label>
                                    <Input id="password1" type="password" placeholder="Password" />
                                </div>
                            </CardContent>
                            <div className="flex items-center justify-center space-x-2">
                                <Checkbox id="terms" />
                                <label htmlFor="terms" className="text-sm font-medium leading-none">
                                    Remember me
                                </label>
                            </div>
                            <CardFooter>
                                <Button onClick={handleAdminClick}>Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
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

export default Login;
