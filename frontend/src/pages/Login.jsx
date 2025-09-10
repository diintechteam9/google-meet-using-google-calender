import LoginButton from '../components/LoginButton';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const { user, loading }=useAuth();
  const navigate=useNavigate();

  useEffect(()=>{
    if(!loading && user){
      navigate('/dashboard', { replace:true });
    }
  },[loading, user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 mx-auto max-w-2xl w-full px-4 flex items-center justify-center">
        <div className="w-full border rounded-lg p-8 shadow-sm bg-white">
          <h1 className="text-3xl font-semibold mb-2 tracking-tight">Welcome to MERN Meet</h1>
          <p className="text-sm text-gray-600 mb-8">Create Google Calendar events with Meet links in seconds.</p>
          <LoginButton />
          <p className="text-xs text-gray-500 mt-4">You’ll be redirected to Google for a secure sign-in.</p>
        </div>
      </main>
    </div>
  );
}


