import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from './Navbar';
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../../Images/small-logo.png";

const Addfood = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    foodname: '',
    foodtype: '',
    foodvariant: '',
    foodprice: '',
    fooddescription: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const { foodname, foodtype, foodvariant, foodprice, fooddescription } = formData;

      if (!foodname || !foodtype || !foodvariant || !foodprice || !fooddescription || !image) {
        alert('Please fill in all fields.');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('foodname', foodname);
      formDataToSend.append('foodtype', foodtype);
      formDataToSend.append('foodvariant', foodvariant);
      formDataToSend.append('foodprice', foodprice);
      formDataToSend.append('fooddescription', fooddescription);
      formDataToSend.append('foodimage', image);

      const response = await fetch('http://localhost:8082/api/add-food', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/home');
      } else {
        alert(data.error || 'Adding Food failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
     <br></br>
     <br></br>
  
      
      <div className="flex-grow flex justify-center items-center bg-gray-100">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Add New Food</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="foodname">Food Name</Label>
              <Input id="foodname" name="foodname" type="text" placeholder="Name" value={formData.foodname} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="foodtype">Food Type</Label>
              <Input id="foodtype" name="foodtype" type="text" placeholder="Type" value={formData.foodtype} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="foodvariant">Food Variant</Label>
              <Input id="foodvariant" name="foodvariant" type="text" placeholder="Variant" value={formData.foodvariant} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="foodprice">Food Price</Label>
              <Input id="foodprice" name="foodprice" type="text" placeholder="Price" value={formData.foodprice} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fooddescription">Food Description</Label>
              <Input id="fooddescription" name="fooddescription" type="text" placeholder="Description" value={formData.fooddescription} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="foodimage">Food Image</Label>
              <Input id="foodimage" name="foodimage" type="file" onChange={handleFile} />
            </div>  
          </CardContent>
          <CardFooter>
            <Button className="bg-black text-white hover:bg-purple-900" onClick={handleUpload}>Upload</Button>
          </CardFooter>
        </Card>
      </div>
     <div>
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
    </div>
  ); 
};

export default Addfood;

