import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";
import NavBar from './Navbar';
import Search from './Search';
import { Footer } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import logo from "../../Images/small-logo.png";

const Cart = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(0);
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [showNoFoodMessage, setShowNoFoodMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();

  useEffect(() => {
    const handleUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser.userId);
      }
    };
    handleUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = () => {
    fetch(`http://localhost:8082/api/cart/${user}`)
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
        toast.error('Failed to fetch cart items');
      });
  };

  const handleUpdateClick = (id, quantity) => {
    setEditItemId(id);
    setTempQuantity(quantity);
  };

  const handleIncrement = () => {
    setTempQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setTempQuantity(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleUpdate = (id) => {
    fetch(`http://localhost:8082/api/update-cart/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: tempQuantity }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchCartItems();
        setEditItemId(null);
        toast.success('Cart item updated successfully');
      })
      .catch((error) => {
        console.error('Error updating cart item:', error);
        toast.error('Failed to update cart item');
      });
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:8082/api/remove-from-cart/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        fetchCartItems();
        toast.success('Item removed from cart successfully');
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
        toast.error('Failed to remove item from cart');
      });
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

  const handleConfirmOrderClick = () => {
    navigate('/cart/confirmorder', { state: { cartItems: cartItems } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
       
        {showNoFoodMessage && (
          <p className="text-center mt-4 text-red-500">No food items available.</p>
        )}
        <div className="flex justify-start mt-8">
          <h1 className="text-4xl font-bold font-roboto">Your Cart</h1>
        </div>
        <div className="flex justify-end mt-8">
          <Button className="px-8 py-3 bg-black text-white rounded hover:bg-blue-600" onClick={handleConfirmOrderClick}>
            Confirm Order
          </Button>
        </div>
        <Search
          foodItems={foodItems}
          setFilteredFoodItems={setFilteredFoodItems}
          setShowNoFoodMessage={setShowNoFoodMessage}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          
          {cartItems.length === 0 ? (
            <p className="col-span-full text-center text-lg">No items in the cart</p>
          ) : (
            
            cartItems.map((item) => (
              <Card key={item.id} className="w-full shadow-lg">
                <CardHeader className="relative p-4">
                  <img src={`http://localhost:8082/uploads/${item.foodimage}`} alt={item.foodname} className="w-full h-48 object-cover rounded-t-lg" />
                  <CardTitle className="mt-4 text-lg font-bold">{item.foodname}</CardTitle>
                  <CardDescription className="mt-2 font-bold">Quantity: {editItemId === item.id ? tempQuantity : item.quantity}</CardDescription>
                  <CardDescription className="mt-2 font-bold">${item.foodprice}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  {editItemId === item.id ? (
                    <div className="flex items-center space-x-4">
                      <Button onClick={handleDecrement} className="px-4 py-2 bg-black text-white rounded">-</Button>
                      <span className="text-lg">{tempQuantity}</span>
                      <Button onClick={handleIncrement} className="px-4 py-2 bg-black text-white rounded ">+</Button>
                      <Button onClick={() => handleUpdate(item.id)} className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600">Save</Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <Button onClick={() => handleUpdateClick(item.id, item.quantity)} className="px-4 py-2 bg-black text-white rounded hover:bg-purple-900">Update</Button>
                      <Button onClick={() => handleRemove(item.id)} className="px-4 py-2 bg-black text-white rounded hover:bg-red-700">Remove</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
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

export default Cart;
