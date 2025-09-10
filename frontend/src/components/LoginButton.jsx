import toast from 'react-hot-toast';

export default function LoginButton(){
  const onLogin=()=>{
    toast.loading('Redirecting to Google...', { id:'login' });
    window.location.href=(import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/auth/google';
  };
  return (
    <button onClick={onLogin} className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto shadow">
      Continue with Google
    </button>
  );
}


