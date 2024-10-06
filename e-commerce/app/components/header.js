'use client'
import { useState } from 'react';
import { FaUser } from 'react-icons/fa'; // Import the user icon
import Link from 'next/link'; // Import Link from next/link
import { signOutUser } from '../lib/auth'; // Import your sign-out function

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Replace with your user state management

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null); // Update user state on sign out
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle menu state
    console.log("Menu Open:", !menuOpen); // Log the current state
  };

  return (
    <header className="bg-orange-900 p-4 w-full flex justify-between items-center">
      <h1 className="text-white font-bold">DigitizeMart.</h1>
      <div className="relative">
        <button
          onClick={toggleMenu} // Call toggleMenu function on click
          className="focus:outline-none"
        >
          <FaUser className="h-6 w-6 text-white" />
        </button>
        {menuOpen && ( // Render dropdown menu if menuOpen is true
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul className="py-1">
              {user ? (
                <li
                  className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign Out
                </li>
              ) : (
                <>
                  <Link href="/signin" passHref>
                    <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                      Sign In
                    </li>
                  </Link>
                  <Link href="/signup" passHref>
                    <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                      Sign Up
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
