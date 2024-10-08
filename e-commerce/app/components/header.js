'use client'
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon
import SignInForm from './auth/signinForm';
import SignUpForm from './auth/signupForm';
import useAuth from '../hooks/useAuth';

export default function Header() {
  const [isAuthFormOpen, setAuthFormOpen] = useState(false);
  const { signup, signin } = useAuth(); // Destructure signup and signin methods

  const toggleAuthForm = () => {
    setAuthFormOpen((prev) => !prev);
  };

  return (
    <header className="bg-orange-900 p-4 w-full relative">
      <h1 className="text-white font-bold">DigitizeMart.</h1>
      <button onClick={toggleAuthForm} className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <FaUserCircle size={24} color="white" />
      </button>
      
      {isAuthFormOpen && (
        <div className="absolute top-full right-0 bg-white p-4 shadow-lg rounded">
          <h2 className="text-lg font-bold">Authentication</h2>
          <SignInForm signin={signin} />
          <SignUpForm signup={signup} />
        </div>
      )}
    </header>
  );
}
