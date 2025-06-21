// // 'use client';
// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import {
// //   createUserWithEmailAndPassword,
// //   updateProfile,
// //   sendEmailVerification,
// // } from 'firebase/auth';
// // import { auth } from '@/lib/firebase';
// // import Link from 'next/link';
// // import { motion } from 'framer-motion';
// // import { Eye, EyeOff } from 'lucide-react';
// // import { Toaster, toast } from 'react-hot-toast';

// // export default function SignupPage() {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const router = useRouter();

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     setError('');

// //     if (password !== confirmPassword) {
// //       setError('Passwords do not match.');
// //       return;
// //     }

// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //       await updateProfile(userCredential.user, { displayName: name });
// //       await sendEmailVerification(userCredential.user);
// //       toast.success('Verification email sent! Please verify before logging in.');
// //       setTimeout(() => router.push('/login'), 2000);
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
// //     <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
// //       <Toaster position="top-center" />
// //       <motion.form
// //         onSubmit={handleSignup}
// //         initial={{ opacity: 0, y: 30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6, ease: 'easeOut' }}
// //         className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 sm:p-10"
// //       >
// //         <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
// //           Create Your Account
// //         </h2>

// //         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

// //         {/* Full Name */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Full Name</label>
// //           <input
// //             type="text"
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             placeholder="Enter your full name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //           />
// //         </div>

// //         {/* Email */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Email</label>
// //           <input
// //             type="email"
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             placeholder="Enter your email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //         </div>

// //         {/* Password */}
// //         <div className="mb-4 relative">
// //           <label className="block text-gray-700 mb-1">Password</label>
// //           <input
// //             type={showPassword ? 'text' : 'password'}
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
// //             placeholder="Create a password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           <button
// //             type="button"
// //             onClick={() => setShowPassword(!showPassword)}
// //             className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
// //             tabIndex={-1}
// //           >
// //             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //           </button>
// //         </div>

// //         {/* Confirm Password */}
// //         <div className="mb-6 relative">
// //           <label className="block text-gray-700 mb-1">Confirm Password</label>
// //           <input
// //             type={showConfirmPassword ? 'text' : 'password'}
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
// //             placeholder="Confirm your password"
// //             value={confirmPassword}
// //             onChange={(e) => setConfirmPassword(e.target.value)}
// //             required
// //           />
// //           <button
// //             type="button"
// //             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //             className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
// //             tabIndex={-1}
// //           >
// //             {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //           </button>
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
// //         >
// //           Sign Up
// //         </button>

// //         <p className="mt-4 text-center text-sm text-gray-600">
// //           Already have an account?{' '}
// //           <Link href="/login" className="text-blue-600 hover:underline">
// //             Login
// //           </Link>
// //         </p>
// //       </motion.form>
// //     </main>
// //   );
// // }


// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   sendEmailVerification,
// } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Eye, EyeOff } from 'lucide-react';
// import { Toaster, toast } from 'react-hot-toast';

// export default function SignupPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(userCredential.user, { displayName: name });
//       await sendEmailVerification(userCredential.user);
//       toast.success('Verification email sent! Please verify before logging in.');
//       setTimeout(() => router.push('/login'), 2000);
//     } catch (err) {
//       toast.error(
//         err.message.includes('email-already-in-use')
//           ? 'Email already in use.'
//           : err.message.includes('weak-password')
//           ? 'Password should be at least 6 characters.'
//           : 'Signup failed.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
//       <Toaster position="top-center" />
//       <motion.form
//         onSubmit={handleSignup}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 sm:p-10"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
//           Create Your Account
//         </h2>

//         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

//         {/* Full Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Full Name</label>
//           <input
//             type="text"
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your full name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4 relative">
//           <label className="block text-gray-700 mb-1">Password</label>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
//             placeholder="Create a password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
//             tabIndex={-1}
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>

//         {/* Confirm Password */}
//         <div className="mb-6 relative">
//           <label className="block text-gray-700 mb-1">Confirm Password</label>
//           <input
//             type={showConfirmPassword ? 'text' : 'password'}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
//             placeholder="Confirm your password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
//             tabIndex={-1}
//           >
//             {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2 ${
//             loading ? 'opacity-70 cursor-not-allowed' : ''
//           }`}
//         >
//           {loading ? (
//             <>
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                 ></path>
//               </svg>
//               Signing up...
//             </>
//           ) : (
//             'Sign Up'
//           )}
//         </button>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link href="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </motion.form>
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase'; // ✅ make sure db is exported in firebase.js
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);

      // ✅ Save user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        role: 'student',
        createdAt: serverTimestamp(),
      });

      toast.success('Verification email sent! Please verify before logging in.');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 sm:p-10"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Create Your Account
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.form>
    </main>
  );
}
