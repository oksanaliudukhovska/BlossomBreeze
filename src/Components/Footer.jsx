import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

  return (
    <footer className="bg-headerDark text-bezchBase2/50 py-12">
    <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div>
        <h2 className="font-corintia text-gold text-4xl mb-4">Blossom Breeze</h2>
        <p className=" text-sm">
          Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctoris.
        </p>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-bezchBase2 hover:text-white"><i><InstagramIcon/></i></a>
          <a href="#" className="text-bezchBase2 hover:text-white"><i> <FacebookIcon/></i></a>
          <a href="#" className="text-bezchBase2 hover:text-white"><i><LinkedInIcon/></i></a>
          <a href="#" className="text-bezchBase2 hover:text-white"><i><TwitterIcon/></i></a>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">WORKING HOURS</h3>
        <ul className="text-sm space-y-2">
          <li>Monday - Friday: 10AM - 9PM</li>
          <li>Saturday: 10AM - 5PM</li>
          <li>Sunday: Closed</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">WHERE TO FIND US</h3>
        <p className=" text-sm">Adress: XXXX XXXX XX, XXXXX</p>
        <p className=" text-sm">Adress 2: XXXX XXXX XX, XXXXX</p>
        <p className=" text-sm">
          <strong>Phone 1:</strong> +XXX/XXX-XXXX
        </p>
        <p className=" text-sm">
          <strong>Phone 2:</strong> +XXX/XXX-XXXX
        </p>
        <p className=" text-sm">
          <strong>E-mail:</strong> blossom@breeze.com
        </p>
      </div>
    </div>


    <div className="text-center  text-sm mt-10 border-t border-bezchBase2 pt-6">
      &copy; 2025 Blossom Breeze, All Rights Reserved
    </div>
  </footer>
  )
}

export default Footer
