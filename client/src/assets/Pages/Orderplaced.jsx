import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'react-feather';

const OrderPlaced = () => {
  const navigate=useNavigate();
  const handleOkayClick = () => {
  
    // Handle the "Okay" button click (e.g., navigate to a different page or close the modal)
    navigate('/myorders');
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center items-center space-x-2">
            <CheckCircle className="text-green-500" size={24} />
            <CardTitle>Order Placed Successfully</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p>Your order has been placed successfully!</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="btn-primary" onClick={handleOkayClick}>Okay</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderPlaced;
