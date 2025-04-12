import React from 'react';
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-darkthemeitems text-gray-100 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Logo className="horizontal"  />
            <p className="text-gray-400">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <a href="mailto:support@tabla.ma" className="text-gray-400 hover:text-white transition">
                  support@tabla.ma
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <a href="tel:+2125585474758" className="text-gray-400 hover:text-white transition">
                  +212 (558) 547 4758
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Restaurants</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Foods</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Register your restaurant</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Create an account</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            All rights reserved by TABLA.MA | {new Date().getFullYear()}©
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;