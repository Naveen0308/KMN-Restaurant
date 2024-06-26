import React, { useContext, useState } from 'react';
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
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../../Images/small-logo.png";


const Login = () => {
    const navigate = useNavigate();
    const { userId, setUserId, emailId, setEmailId } = useContext(UserContext);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [adminFormData, setAdminFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleAdminInputChange = (e) => {
        const { name, value } = e.target;
        setAdminFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleLoginClick = async () => {
        try {
            const { email, password } = formData;
            const response = await fetch(`http://localhost:8082/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setEmailId(data.email);
                setUserId(data.userId);
                localStorage.setItem('user', JSON.stringify({ userId: data.userId, emailId: data.email }));
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
                setUserId(0);
                setEmailId(enteredEmail);
                localStorage.setItem('user', JSON.stringify({ userId: 0, emailId: enteredEmail }));
                // localStorage.setItem('userId',JSON.stringify(0));
                // localStorage.setItem('emailId', JSON.stringify(enteredEmail));
                navigate('/home');
            } else {
                alert('Invalid admin username or password');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
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
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" id="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
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
                                <label htmlFor="terms" className="text-sm font-medium leading-none">Remember me</label>
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
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email1" name="email" type="text" placeholder="Email" value={adminFormData.email} onChange={handleAdminInputChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password1" name="password" type="password" placeholder="Password" value={adminFormData.password} onChange={handleAdminInputChange} />
                                </div>
                            </CardContent>
                            <div className="flex items-center justify-center space-x-2">
                                <Checkbox id="terms" />
                                <label htmlFor="terms" className="text-sm font-medium leading-none">Remember me</label>
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
