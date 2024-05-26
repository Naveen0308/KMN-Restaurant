import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import vegIcon from "../../Images/veg-icon.png"; // Placeholder for veg icon
import nonVegIcon from "../../Images/non-veg-icon.png"; // Placeholder for non-veg icon
import { toast } from "sonner";

export default function Foodcard({ foodItems, isTable = false }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [table, setTable] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = foodItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [userId, setUserId] = useState(() => {
    const storedUserId = JSON.parse(localStorage.getItem('user'))?.userId;
    return storedUserId;
  });

  const [emailId, setEmailId] = useState(() => {
    const storedEmailId = JSON.parse(localStorage.getItem('user'))?.emailId;
    return storedEmailId;
  });

  const isAdmin = userId === 0 && emailId === "admin@gmail.com";

  useEffect(() => {
    const handleUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser.userId);
      }
    };
    handleUserData();
  }, []);

  const addToCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: { quantity: 1 },
    }));
  };

  const addToTable = (id) => {
    setTable((prevTable) => ({
      ...prevTable,
      [id]: { quantity: 1 },
    }));
  };

  const incrementItem = (id) => {
    if (isTable) {
      setTable((prevTable) => ({
        ...prevTable,
        [id]: { quantity: prevTable[id].quantity + 1 },
      }));
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        [id]: { quantity: prevCart[id].quantity + 1 },
      }));
    }
  };

  const decrementItem = (id) => {
    if (isTable) {
      setTable((prevTable) => {
        const newTable = { ...prevTable };
        if (newTable[id].quantity > 1) {
          newTable[id] = { quantity: newTable[id].quantity - 1 };
        } else {
          delete newTable[id];
        }
        return newTable;
      });
    } else {
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        if (newCart[id].quantity > 1) {
          newCart[id] = { quantity: newCart[id].quantity - 1 };
        } else {
          delete newCart[id];
        }
        return newCart;
      });
    }
  };

  const sendToCart = () => {
    const selectedItems = Object.entries(cart).map(([id, item]) => ({
      userId: user,
      foodId: id,
      quantity: item.quantity,
    }));

    fetch("http://localhost:8082/api/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedItems),
    })
      .then((response) => {
        if (response.ok) {
          toast("Items have been sent to the cart", {
            description: "You have successfully added items to your cart.",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          setCart({}); // Clear the cart after successful addition
        } else {
          toast.error("Failed to send items to cart");
        }
      })
      .catch((error) => {
        console.error("Error sending items to cart:", error);
        toast.error("Failed to send items to cart");
      });
  };

  const sendToTable = () => {
    const selectedItems = Object.entries(table).map(([id, item]) => ({
      userId: user,
      foodId: id,
      quantity: item.quantity,
    }));
    fetch("http://localhost:8082/api/add-to-cart-table", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedItems),
    })
      .then((response) => {
        if (response.ok) {
          toast("Items have been sent to the table", {
            description: "You have successfully added items to your table.",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          setTable({}); // Clear the table after successful addition
        } else {
          toast.error("Failed to send items to table");
        }
      })
      .catch((error) => {
        console.error("Error sending items to table:", error);
        toast.error("Failed to send items to table");
      });
  };

  const deleteFood = (id) => {
    fetch(`http://localhost:8082/api/delete-food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          toast("Food item deleted successfully");
          window.location.reload(); // Reload the page after successful deletion
        } else {
          toast.error("Failed to delete food item");
        }
      })
      .catch((error) => {
        console.error("Error deleting food item:", error);
        toast.error("Failed to delete food item");
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {currentItems.map((food) => (
          <Card key={food.id} className="w-full">
            <CardHeader className="relative">
              <img src={`http://localhost:8082/uploads/${food.foodimage}`} alt={food.foodname} className="w-full h-48 object-cover" />
              <CardTitle className="mt-4 text-lg font-bold">{food.foodname}</CardTitle>
              <CardDescription>${food.foodprice}</CardDescription>
              <CardDescription>{food.fooddescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between mt-2">
              <div>
                <img
                  src={food.foodtype === "Veg" ? vegIcon : nonVegIcon}
                  alt={food.foodtype}
                  className="w-6 h-6"
                />
                <CardDescription>{food.foodtype}</CardDescription>
              </div>
              {isTable ? (
                table[food.id] ? (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => decrementItem(food.id)}>-</Button>
                    <span>{table[food.id].quantity}</span>
                    <Button variant="outline" onClick={() => incrementItem(food.id)}>+</Button>
                  </div>
                ) : (
                  <Button onClick={() => addToTable(food.id)}>Add to Table</Button>
                )
              ) : (
                cart[food.id] ? (
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" onClick={() => decrementItem(food.id)}>-</Button>
                    <span>{cart[food.id].quantity}</span>
                    <Button variant="outline" onClick={() => incrementItem(food.id)}>+</Button>
                  </div>
                ) : (
                  <div>
                    <Button onClick={() => addToCart(food.id)}>Add to Cart</Button><hr></hr>
                    {isAdmin ? (<Button onClick={() => deleteFood(food.id)}>Delete</Button>) : null}
                  </div>
                )
              )}
            </CardContent>

            {isTable ? (
              table[food.id] && (
                <CardFooter className="flex justify-end mt-2">
                  <Button onClick={sendToTable}>Send to Table</Button>
                </CardFooter>
              )
            ) : (
              cart[food.id] && (
                <CardFooter className="flex justify-end mt-2">
                  <Button onClick={sendToCart}>Send to Cart</Button>
                </CardFooter>
              )
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
