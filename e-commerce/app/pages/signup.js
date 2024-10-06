// pages/signup.js
import AuthForm from '../components/authForm';
import { signUp } from '../lib/auth';

const SignUp = () => {
  const handleSignUp = async (email, password) => {
    const user = await signUp(email, password);
    console.log('User signed up:', user);
    // Redirect or show success message here
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <AuthForm type="signup" onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUp;
