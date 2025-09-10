import Navbar from '../components/Navbar';

export default function Privacy(){
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-8">
        <div className="bg-white border rounded-lg p-6 shadow-sm prose prose-sm sm:prose">
          <h1>Privacy Policy</h1>
          <p>
            We respect your privacy. This app requests access to your Google account only to
            create and manage calendar events with Google Meet links on your behalf.
          </p>
          <h2>Data We Collect</h2>
          <ul>
            <li>Basic Google profile information (name, email, avatar)</li>
            <li>OAuth tokens to securely call the Google Calendar API</li>
            <li>Events you create via this app (summary, time, attendees, Meet link)</li>
          </ul>
          <h2>How We Use Your Data</h2>
          <ul>
            <li>To authenticate you and keep you signed in</li>
            <li>To create Google Calendar events and generate Meet links</li>
            <li>To show your created meetings inside the app</li>
          </ul>
          <h2>Data Sharing</h2>
          <p>
            We do not sell your data. We only share information with Google as required to
            provide the Meet creation functionality.
          </p>
          <h2>Data Retention</h2>
          <p>
            We store tokens and the events you create for as long as your account remains
            active. You can request deletion at any time.
          </p>
          <h2>Contact</h2>
          <p>
            If you have any questions about this policy or wish to delete your data, please
            contact the developer.
          </p>
        </div>
      </main>
    </div>
  );
}


