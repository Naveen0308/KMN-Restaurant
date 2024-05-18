import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import vegIcon from "../../Images/veg-icon.png"; // Placeholder for veg icon
import nonVegIcon from "../../Images/non-veg-icon.png"; // Placeholder for non-veg icon
import { toast } from "sonner";

export function Foodcard() {
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch("http://localhost:8082/api/food")
      .then((response) => response.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  const addToCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: 1,
    }));
  };

  const incrementItem = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] + 1,
    }));
  };

  const decrementItem = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const sendToCart = () => {
    toast("Items have been sent to the cart", {
      description: "You have successfully added items to your cart.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {foodItems.map((food) => (
        <Card key={food.id} className="w-[350px]">
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
            {cart[food.id] ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => decrementItem(food.id)}>-</Button>
                <span>{cart[food.id]}</span>
                <Button variant="outline" onClick={() => incrementItem(food.id)}>+</Button>
              </div>
            ) : (
              <Button onClick={() => addToCart(food.id)}>Add to Cart</Button>
            )}
          </CardContent>
          {cart[food.id] && (
            <CardFooter className="flex justify-end mt-2">
              <Button onClick={sendToCart}>Send to Cart</Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
