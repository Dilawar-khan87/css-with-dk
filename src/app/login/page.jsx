'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/student/dashboard');
    } catch (err) {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Login to Your Account</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="mt-4 text-sm">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </form>
    </main>
  );
}
