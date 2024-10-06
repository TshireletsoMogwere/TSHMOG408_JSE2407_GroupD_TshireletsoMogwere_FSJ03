// pages/signin.js
import AuthForm from '../components/authForm';
import { signIn } from '../lib/auth';

const SignIn = () => {
  const handleSignIn = async (email, password) => {
    const user = await signIn(email, password);
    console.log('User signed in:', user);
    // Redirect or show success message here
  };

  return (
    <div>
      <h1>Sign In</h1>
      <AuthForm type="signin" onSubmit={handleSignIn} />
    </div>
  );
};

export default SignIn;
