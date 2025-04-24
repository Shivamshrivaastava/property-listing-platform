import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-50 to-white p-6">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md border-t-4 border-primary-600">
        <div className="text-center mb-6">
          <img
            src="data:image/jpeg;base64,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"
            alt="house-icon"
            className="mx-auto mb-2"
          />
          <h2 className="text-3xl font-extrabold text-primary-600">
            {isSignUp ? 'Join Our Property Listing Community' : 'Welcome Back to HomeFinder'}
          </h2>
          <p className="text-sm text-gray-500">
            {isSignUp
              ? 'Create your account to find your dream home!'
              : 'Log in to explore the best property listings in your area!'}
          </p>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="📧 Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-600">or</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition text-sm"
        >
          <img
            src="https://img.icons8.com/color/24/google-logo.png"
            alt="google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        <div className="text-center text-sm mt-4">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setIsSignUp(false)}
                className="text-primary-600 font-semibold cursor-pointer hover:underline"
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                onClick={() => setIsSignUp(true)}
                className="text-primary-600 font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
