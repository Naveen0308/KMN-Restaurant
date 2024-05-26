import React, { useState, useEffect } from 'react';
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsCart } from "react-icons/bs";
import Navbar from '../Pages/Navbar';
import Foodcard from '../Pages/Foodcard';
import Search from './Search';
import logo from "../../Images/small-logo.png";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Tablefoodlist = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [showNoFoodMessage, setShowNoFoodMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const handleUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser?.userId);
      setEmail(storedUser?.emailId);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoodItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(filteredFoodItems.length / itemsPerPage)) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const handleCheckout = () => {
    // Handle the checkout process
    console.log('Checkout button clicked');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
     <br></br>
     <br></br>
     <br></br>
      <h1 className="text-center text-2xl font-bold mt-4">Table Food List</h1>
      <Search
        foodItems={foodItems}
        setFilteredFoodItems={setFilteredFoodItems}
        setShowNoFoodMessage={setShowNoFoodMessage}
      />
      {showNoFoodMessage && (
        <p className="text-center mt-4 text-red-500">No food items available.</p>
      )}
      <div className="flex justify-end p-4">
        <button 
          onClick={handleCheckout} 
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <BsCart className="w-5 h-5" />
          <span>Checkout Table</span>
        </button>
      </div>
      <div className="flex flex-col items-center mt-8">
        <Foodcard foodItems={currentItems} userId={user} isTable={true} />
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
                  <Footer.Link href="#" className="text-white">Terms & Conditions</Footer.Link>
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

export default Tablefoodlist;
