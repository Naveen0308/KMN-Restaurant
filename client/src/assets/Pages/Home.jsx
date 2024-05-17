import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Assuming these are the correct carousel components
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import Navbar from "./Navbar";
import { Card, CardContent } from "@/components/ui/card"; // Importing card components for the new carousel

const Home = () => {
  const { userId, emailId } = useContext(UserContext);
  const images = [image1, image2, image3, image4, image5];

  // Check if the user is admin
  const isAdmin = userId === 0 && emailId === "admin@gmail.com";

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
    </div>
  );
};

export default Home;
