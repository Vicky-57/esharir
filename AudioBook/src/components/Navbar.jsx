import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooksOpen, setIsBooksOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#2e0000] to-[#b60200] p-4 ">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/home" className="text-white text-xl font-bold">e-Sharir</Link>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search..." 
              className="px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {/* <div className='px-2 py-2 rounded-full bg-white'>
            <SearchIcon className='' />

            </div> */}
          </div>
          <button className="relative">
            <div className="w-8 h-8 rounded-full bg-white flex z items-center justify-center">
              <MicIcon className='' />
            </div>
          </button>
          <Link to="/profile" className="text-white">Profile</Link>
          <div className="relative">
            <button 
              className="text-white flex items-center" 
              onClick={() => setIsBooksOpen(!isBooksOpen)}
            >
              Books
              <svg className="ml-2 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isBooksOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <Link to="/sushrut" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sushrut Samhita</Link>
                <Link to="/ashtang" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Ashtang Samgraha </Link>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full px-4 py-2 mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="w-full text-white mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 10l-6 6-1.5-1.5M13 16.5V21m0 0h-3.5m3.5-4.5l-6-6" />
            </svg>
          </button>
          <Link to="/profile" className="block text-white mt-2">Profile</Link>
          <div className="relative mt-2">
            <button 
              className="text-white flex items-center"
              onClick={() => setIsBooksOpen(!isBooksOpen)}
            >
              Books
              <svg className="ml-2 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isBooksOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <Link to="/sushrut" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sushrut Samhita</Link>
                <Link to="/ashtang" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Ashtang Samgraha </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
