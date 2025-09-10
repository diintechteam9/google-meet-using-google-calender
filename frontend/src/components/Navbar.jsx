import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { logout as apiLogout } from '../services/api';
import toast from 'react-hot-toast';

export default function Navbar(){
  const { user }=useAuth();

  const onLogout=async()=>{
    try{ await apiLogout(); toast.success('Logged out'); window.location.href='/'; }
    catch{ toast.error('Failed to logout'); }
  };

  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white"><Calendar className="w-4 h-4" /></span>
          <span className="text-lg">MERN Meet</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/create-meet" className="px-3 py-2 rounded hover:bg-gray-100">Create Meet</Link>
          <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
          <Link to="/privacy" className="px-3 py-2 rounded hover:bg-gray-100">Privacy</Link>
          <Link to="/terms" className="px-3 py-2 rounded hover:bg-gray-100">Terms</Link>
          {user? (
            <button onClick={onLogout} className="ml-2 px-3 py-2 rounded bg-gray-900 text-white hover:bg-black">Logout</button>
          ) : (
            <a href="/" className="ml-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Sign in</a>
          )}
        </nav>
      </div>
    </header>
  );
}


