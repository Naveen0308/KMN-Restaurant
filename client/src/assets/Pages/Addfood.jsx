import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f8f8' }}>
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
          <Button onClick={handleUpload}>Upload</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Addfood;
