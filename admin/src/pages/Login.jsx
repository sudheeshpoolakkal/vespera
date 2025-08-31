import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import bgImage from '../assets/assets_admin/aurora.webp';

function Login() {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          navigate('/admin-dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          localStorage.setItem('docId', data.docId);
          setDToken(data.token);
          navigate('/doctor-dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Optional cross button to navigate back */}
      <button
  onClick={() => window.location.href = "https://spiritus.vercel.app/"}
  className="absolute top-12 right-12 bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-500 focus:outline-none"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>


      <form onSubmit={onSubmitHandler} className="bg-[#242425] p-8 rounded-3xl shadow-lg w-full max-w-md text-zinc-200">
        <h2 className="text-2xl font-bold mb-4">{state} Login</h2>
        <p className="mb-6">Log in to access your dashboard</p>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mb-4 rounded-full bg-primary text-white font-semibold hover:bg-black"
        >
          Login
        </button>

        <p className="text-center">
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span onClick={() => setState('Doctor')} className="text-primary underline cursor-pointer">
                Click Here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span onClick={() => setState('Admin')} className="text-primary underline cursor-pointer">
                Click Here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default Login;
