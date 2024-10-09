import { useAuth } from "@/hooks/useAuth";

/**
* A functional component that displays the current user's status and provides a sign out button.
* It uses the `useAuth` hook to get the current user and loading status.
*
* @returns {JSX.Element} - A JSX element displaying the user's status and a sign out button.
*/

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

