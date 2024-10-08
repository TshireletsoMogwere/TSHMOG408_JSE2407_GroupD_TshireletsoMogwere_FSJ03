import { useState } from 'react';
import useAuth from '@/app/hooks/useAuth';

const SignInForm = () => {
  const { signin, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
      alert('Successfully signed in!'); // Alert on successful signin
      // Optionally reset form fields
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      // Handle error (optional, since it's already set in useAuth)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </form>
  );
};

export default SignInForm;
