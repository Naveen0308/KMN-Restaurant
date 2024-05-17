import React from 'react'
import { Button } from "@/components/ui/button";

const Addfood = () => {

    const[image,setImage]=useState(null);
    const [formData, setFormData] = useState({
        foodname: '',
        foodtype: '',
        foodvariant: '',
        foodprice: '',
        fooddescription: '',
        foodimage: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const handleFile=(e) => {
          setImage(e.target.files[0]);
      }

      const handleUpload=()=>{

      }
    
      const handleSignupClick = async () => {
        try {
          const { foodname, foodtype, foodvariant, foodprice, fooddescription, foodimage } = formData;
      
          // Log the form data to check values
          console.log('Form Data:', formData);
      
          if (!foodname || !fooddescription || !foodtype || !foodvariant || !foodprice || !foodimage) {
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
              foodname,
              foodtype,
              foodvariant,
              foodprice,
              fooddescription,
              foodimage,

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
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100vh', paddingLeft: '180px' }}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add New Food</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Food Name</Label>
            <Input id="name" name="name" type="text" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Food Type</Label>
            <Input id="username" name="username" type="text" placeholder="Username" value={formData.username} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Food Price</Label>
            <Input id="email" name="email" type="text" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Food Description</Label>
            <Input id="password" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="file">Food Image</Label>
            <Input id="file" name="file" type="file" onChange={handleFile}/>
            <Button onClick={handleUpload}>Upload</Button>
          </div>
        </CardContent>
        
        <div className="h-4"></div> {/* Add empty div for spacing */}
        <CardFooter>
          <Button onClick={handleSignupClick}>Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Addfood