import React from 'react';
import { Textarea, TextInput } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from './Navbar';
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../../Images/small-logo.png";

const Email = () => {
  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <NavBar />
      <br></br>
      <br></br>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="foodname">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="foodname">User Name</Label>
              <Input id="username" name="username" type="text" placeholder="User Name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="foodname">Mail Id</Label>
              <Input id="mailid" name="mailid" type="text" placeholder="Mail Id" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="foodname">Message</Label>
              <Textarea id="message" name="message" type="text" placeholder=" Message" cols={30} rows={10} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-black text-white hover:bg-purple-900">Send</Button>
          </CardFooter>
        </Card>
      </div>
      <br></br>
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
  )
}

export default Email;
