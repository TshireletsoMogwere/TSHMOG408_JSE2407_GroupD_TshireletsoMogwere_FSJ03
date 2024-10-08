import { useAuth } from '@/hooks/useAuth';

const AuthStatus = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signout}>Sign Out</button>
    </div>
  ) : (
    <p>Please sign in.</p>
  );
};

export default AuthStatus;
