import Navbar from '../components/Navbar';
import MeetForm from '../components/MeetForm';
import { useAuth } from '../hooks/useAuth';

export default function CreateMeet(){
  const { user, loading }=useAuth();
  if(loading) return <div className="p-8">Loading...</div>;
  if(!user) return <div className="p-8">Not signed in</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 mx-auto max-w-2xl w-full px-4 py-8">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold mb-4">Create a Google Meet</h1>
          <MeetForm />
        </div>
      </main>
    </div>
  );
}


