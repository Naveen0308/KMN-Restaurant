import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import logo from "../../Images/small-logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

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

function CartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M1 1h4l3.78 14.805A2 2 0 0 0 10.719 17h2.563a2 2 0 0 0 1.938-1.195L20 4H6"></path>
      <circle cx="12" cy="19" r="2"></circle>
    </svg>
  );
}

export default function NavBar() {
  const navigate = useNavigate();
  // const { userId, emailId, userName } = useContext(UserContext);
  
  const [userId, setUserId] = useState(() => {
    const storedUserId = JSON.parse(localStorage.getItem('user'))?.userId;
    return storedUserId;
  });
  
  const [emailId, setEmailId] = useState(() => {
    const storedEmailId = JSON.parse(localStorage.getItem('user'))?.emailId;
    return storedEmailId;
  });
  
  //console.log("Navbar",userId,emailId);
  const isAdmin = userId === 0 && emailId === "admin@gmail.com";

  const handleLogoutClick = () => {
    localStorage.removeItem('user');
    setUserId(null);
    setEmailId(null);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleAddFoodClick = () => {
    navigate('/addfood');
  };

  const handleCartClick = () => {
    console.log(userId);
    navigate('/cart', { state: { userId:userId } });
    
  }

  const handleTableBookingClick = () => {
    navigate('/tablebooking');
  }

  const handleHomeClick = () => {
    navigate('/home');
  }

  const handleMyOrdersClick = () => {
    navigate('/myorders');
  }

  const handleFoodOrdersListClick = () => {
    navigate('/food-orders-list');
  }

  const handleTableOrdersListClick = () => {
    navigate('/table-orders-list');
  }

  const handleCustomersListClick = () => {
    navigate('/customers-list');
  }


  const handleEmailClick = () => {
    navigate('/home/email');
  }


  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
          {/* <MountainIcon className="h-6 w-6" /> */}
          <img src={logo} alt="KMN" className="h-10 w-30" />
            <span className="sr-only">Acme Inc</span>
          </div>
          <div className="flex flex-grow justify-center items-center">
  <nav className="flex gap-x-8">
    <a 
      href="#" 
      className="font-medium flex items-center text-sm transition-colors hover:text-purple-900 hover:underline" 
      onClick={handleHomeClick}
    >
      Home
    </a>
    <a 
      href="#" 
      className="font-medium flex items-center text-sm transition-colors hover:text-purple-900 hover:underline"
    >
      About
    </a>
    <a 
      href="#" 
      className="font-medium flex items-center text-sm transition-colors hover:text-purple-900 hover:underline"
    >
      Foods
    </a>
    <a 
      href="#" 
      className="font-medium flex items-center text-sm transition-colors hover:text-purple-900 hover:underline"
      onClick={handleEmailClick}
    >
      Contact
    </a>
    <a 
      href="#" 
      className="font-medium flex items-center text-sm transition-colors hover:text-purple-900 hover:underline" 
      onClick={handleTableBookingClick}
    >
      Table Booking
    </a>
  </nav>
</div>

          
          <div className="flex items-center ml-auto">
          <CartIcon className="h-6 w-6 cursor-pointer mr-4" onClick={handleCartClick}/>
          {isAdmin ? 
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                {/* <span>{userName}</span> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Welcome Admin!!!!!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleFoodOrdersListClick}>
                    Food Orders 
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleTableOrdersListClick}>
                    Table Orders
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleCustomersListClick}>Customers</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAddFoodClick}>
                    Add Foods
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick} >
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : 
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleProfileClick} >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleMyOrdersClick}>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
             
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Raise Issue</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={handleEmailClick} >Email</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    Food Tracking
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick} >
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>}
            
          </div>
        </div>
      </div>
    </nav>
  );
}
