
import { Button } from "@/components/ui/button";import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup, DropdownMenuItem,DropdownMenuLabel,DropdownMenuPortal,DropdownMenuSeparator,
  DropdownMenuShortcut,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

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

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
      navigate('/');
  };

  const handleAddFoodClick = () => {
    navigate('/addfood')
  }
  const { userId, emailId } = useContext(UserContext);
  const isAdmin = userId === 0 && emailId === "admin@gmail.com";
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </div>
          <div className="flex flex-grow justify-center items-center">
            <nav className="flex gap-x-8">
              <a href="#" className="font-medium flex items-center text-sm transition-colors hover:underline">
                Home
              </a>
              <a href="#" className="font-medium flex items-center text-sm transition-colors hover:underline">
                About
              </a>
              <a href="#" className="font-medium flex items-center text-sm transition-colors hover:underline">
                Foods
              </a>
              <a href="#" className="font-medium flex items-center text-sm transition-colors hover:underline">
                Contact
              </a>
              <a href="#" className="font-medium flex items-center text-sm transition-colors hover:underline">
                Table Booking
              </a>
            </nav>
          </div>
          
          <div className="flex items-center ml-auto">
          {isAdmin ? 
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Welcome Admin!!!!!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Food Orders 
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Table Orders
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Customers</DropdownMenuItem>
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
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Cart</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Raise Issue</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
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
