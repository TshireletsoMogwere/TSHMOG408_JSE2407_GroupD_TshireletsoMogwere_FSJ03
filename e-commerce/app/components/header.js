"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import SignInForm from "./auth/signinForm";
import SignUpForm from "./auth/signupForm";
import InstallPwaButton from "./installPwaButton";
/**
 * Header component for the e-commerce application.
 * Displays the application logo, user icon, and authentication forms.
 *
 * @returns {JSX.Element} - The Header component.
 */
export default function Header() {
  const { user, signout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false); 

  const toggleAuth = () => setIsAuthOpen(!isAuthOpen); 

  const handleSignOut = async () => {
    await signout(); // Call signout from useAuth
  };

  return (
    <header className="bg-orange-900 p-4 w-full flex justify-between items-center">
      <InstallPwaButton />
      <h1 className="text-white font-bold">DigitizeMart.</h1>
      <div className="relative">
        <button onClick={toggleAuth} className="text-white">
          <FaUser /> {/* User icon */}
        </button>
        {isAuthOpen && (
          <div className="absolute right-0 bg-white shadow-lg p-4">
            {user ? (
              <>
                <p>Welcome, {user.email}!</p> {/* Display user email */}
                <button onClick={handleSignOut} className="text-red-600">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <SignInForm />
                <SignUpForm />
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}