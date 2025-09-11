import LoginButton from '../components/LoginButton';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(){
  const { user, loading }=useAuth();
  const navigate=useNavigate();

  useEffect(()=>{
    if(!loading && user){
      navigate('/dashboard', { replace:true });
    }
  },[loading, user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full">
        <section className="mx-auto max-w-md px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign in to continue</h1>
          <p className="mt-2 text-gray-600">Use your Google account to access your dashboard.</p>
          <div className="mt-8 flex flex-col items-center gap-4">
                <LoginButton />
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Back to home</Link>
          </div>
        </section>
      </main>
    </div>
  );
}


