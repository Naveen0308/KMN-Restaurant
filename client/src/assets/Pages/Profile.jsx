import React ,{useState,useEffect} from 'react';
import NavBar from './Navbar';
import { Footer } from "flowbite-react";
import { toast } from 'sonner';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "../../Images/small-logo.png";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});

    const [user,setuser]=useState(null);
    const [email,setemail]=useState(null);

    const isAdmin = user === 0 && email === "admin@gmail.com";

    
    useEffect(() => {
      // Fetch user details using userId from local storage
      const storedUserId = JSON.parse(localStorage.getItem('user'))?.userId;
      if (storedUserId) {
        fetchUserDetails(storedUserId);
      }
    },[]);  


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
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex-grow flex justify-center items-center">
        <Card className="w-full max-w-2xl h-auto bg-base-200 shadow-xl m-4">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">User Details</h2>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
              <p>Phone: {userDetails.phone}</p>
              <p>Address: {userDetails.address}</p>
            </div>
          </CardContent>
        </Card>
      </div>
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

export default Profile;
