import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { listMeets } from '../services/api';

export default function Dashboard(){
  const { user, loading }=useAuth();
  const [items,setItems]=useState([]);

  useEffect(()=>{
    (async()=>{
      // Only fetch after auth known and user present
      if(loading || !user) return;
      try{
        const { data }=await listMeets();
        setItems(data);
      }catch(e){ setItems([]); }
    })();
  },[loading, user]);

  if(loading) return <div className="p-8">Loading...</div>;
  if(!user) return <div className="p-8">Not signed in</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-8">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Welcome, {user.name || user.email}</h1>
          <p className="text-gray-600 mt-2">Create and manage your Google Meet events.</p>
          <div className="mt-6">
            <a href="/create-meet" className="inline-block px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow">Create a new Meet</a>
          </div>
          <h2 className="text-xl font-semibold mt-8 mb-3">Your Meetings</h2>
          <div className="grid gap-3">
            {items.map(ev=> (
              <div key={ev._id} className="border rounded p-4 hover:shadow-sm">
                <div className="font-medium">{ev.summary}</div>
                <div className="text-sm text-gray-600">{new Date(ev.start).toLocaleString()} - {new Date(ev.end).toLocaleString()}</div>
                <a className="text-blue-600 text-sm hover:underline" href={ev.hangoutLink} target="_blank" rel="noreferrer">Join Link</a>
              </div>
            ))}
            {items.length===0 && <div className="text-gray-600">No meetings yet.</div>}
          </div>
        </div>
      </main>
    </div>
  );
}


