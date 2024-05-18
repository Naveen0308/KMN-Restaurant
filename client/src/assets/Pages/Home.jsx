import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Assuming these are the correct carousel components
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import Navbar from "./Navbar";
import { Card, CardContent } from "@/components/ui/card"; // Importing card components for the new carousel
import { Foodcard } from './Foodcard';
import Search from './Search'; // Importing Search component
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Home = () => {
  const { userId, emailId } = useContext(UserContext);
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [showNoFoodMessage, setShowNoFoodMessage] = useState(false);

  const images = [image1, image2, image3, image4, image5];

  // Check if the user is admin
  const isAdmin = userId === 0 && emailId === "admin@gmail.com";

  useEffect(() => {
    // Fetch food items from the backend
    fetch("http://localhost:8082/api/food")
      .then((response) => response.json())
      .then((data) => {
        setFoodItems(data);
        setFilteredFoodItems(data);
      })
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold font-roboto">KMN Restaurant</h1>
        <p>{isAdmin ? 'Welcome Admin User!' : 'Welcome User!'}</p>
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
      <div className="flex justify-center mt-8">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {Array.from({ length: 12 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-4">
                      <span className="text-2xl font-semibold">{index + 1}</span>
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
      <Foodcard foodItems={filteredFoodItems} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <footer className="bg-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="flex items-center">
              <Link className="flex items-center space-x-2" to="#">
                <MountainIcon className="h-8 w-8 text-white" />
                <span className="text-xl font-bold">Acme Inc</span>
              </Link>
            </div>
            <nav className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <Link className="text-gray-300 hover:text-white" to="#">
                Home
              </Link>
              <Link className="text-gray-300 hover:text-white" to="#">
                About
              </Link>
              <Link className="text-gray-300 hover:text-white" to="#">
                Contact
              </Link>
              <Link className="text-gray-300 hover:text-white" to="#">
                Services
              </Link>
            </nav>
            <div className="flex items-center justify-end space-x-4 md:space-x-6 lg:space-x-8">
              <Link to="#" target="_blank">
                <TwitterIcon className="h-6 w-6 text-gray-300 hover:text-white" />
              </Link>
              <Link to="#" target="_blank">
                <FacebookIcon className="h-6 w-6 text-gray-300 hover:text-white" />
              </Link>
              <Link to="#" target="_blank">
                <InstagramIcon className="h-6 w-6 text-gray-300 hover:text-white" />
              </Link>
              <Link to="#" target="_blank">
                <LinkedinIcon className="h-6 w-6 text-gray-300 hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export default Home;
