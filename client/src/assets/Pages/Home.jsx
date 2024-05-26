import React, { useState, useEffect } from 'react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import Navbar from "./Navbar";
import { Card, CardContent } from "@/components/ui/card";
import Foodcard from '../Pages/Foodcard';
import Search from './Search';
import { Footer } from 'flowbite-react';
import UserContext from '../../UserContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import biriyaniImage from "../../Images/Biriyani.jpg";
import starters from "../../Images/Starters.jpg";
import friedrice from "../../Images/friedrice.jpg";
import meals from "../../Images/meals.jpg";
import desserts from "../../Images/desserts.jpg";
import logo from "../../Images/small-logo.png";

const Home = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [showNoFoodMessage, setShowNoFoodMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const images = [image1, image2, image3, image4, image5];
  const foodImages = [biriyaniImage, starters, meals, friedrice, desserts];
  const foodNames = ["Biriyani","Starters","Meals","Fried Rice","Desserts"];

  const isAdmin = user === 0 && email === "admin@gmail.com";

  useEffect(() => {
    const handleUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser.userId);
        setEmail(storedUser.emailId);
      }
    };
    handleUserData();
    fetchFoodItems();
  }, []);

  const fetchFoodItems = () => {
    fetch("http://localhost:8082/api/food")
      .then((response) => response.json())
      .then((data) => {
        setFoodItems(data);
        setFilteredFoodItems(data);
      })
      .catch((error) => console.error("Error fetching food items:", error));
  };

  const fetchFoodItemsByVariant = (variant) => {
    fetch(`http://localhost:8082/api/food/by-variant/${variant}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch food items by variant');
        }
        return response.json();
      })
      .then((data) => {
        setFilteredFoodItems(data);
      })
      .catch((error) => {
        console.error('Error fetching food items by variant:', error.message);
        // Handle error (e.g., display error message to user)
      });
  };

  const handleVariantCardClick = (variant) => {
    fetchFoodItemsByVariant(variant);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoodItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(filteredFoodItems.length / itemsPerPage)) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-center mt-16">
        <img src={logo} alt="Logo" className="h-20 mx-auto" />
      </div>
      <div className="flex justify-center mt-8">
        <Carousel className="w-full max-w-6xl">
          <CarouselContent className="h-[400px]">
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <img src={image} alt={`Image ${index + 1}`} className="object-cover w-full h-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex justify-center mt-10">
        <Carousel className="w-full max-w-3xl">
          <CarouselContent>
            {foodImages.map((image, index) => (
              <CarouselItem key={index} className="w-full md:basis-1/3 lg:basis-1/3">
                <div className="transition-transform transform hover:scale-105">
                  <Card className="shadow hover:shadow-lg" onClick={() => handleVariantCardClick(foodNames[index])}>
                    <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                      <img src={image} alt={foodNames[index]} className="object-cover w-full h-48" />
                      <span className="text-lg font-semibold mt-2">{foodNames[index]}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      
      <Search
        foodItems={foodItems}
        setFilteredFoodItems={setFilteredFoodItems}
        setShowNoFoodMessage={setShowNoFoodMessage}
      />
      {showNoFoodMessage && (
        <p className="text-center mt-4 text-red-500">No food items available.</p>
      )}
      <div className="flex flex-col items-center mt-8">
        <Foodcard foodItems={currentItems} userId={user} />
        <div className="my-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
              </PaginationItem>
              {[...Array(Math.ceil(filteredFoodItems.length / itemsPerPage)).keys()].map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber + 1 === currentPage}
                    onClick={() => paginate(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredFoodItems.length / itemsPerPage)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div className="flex-grow"></div>
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

export default Home;

