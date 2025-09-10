import Navbar from '../components/Navbar';

export default function Terms(){
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-8">
        <div className="bg-white border rounded-lg p-6 shadow-sm prose prose-sm sm:prose">
          <h1>Terms & Conditions</h1>
          <p>
            By using this application, you agree to the following terms.
          </p>
          <h2>Acceptable Use</h2>
          <ul>
            <li>Do not attempt to abuse, reverse-engineer, or disrupt the app.</li>
            <li>Only create meetings for legitimate purposes.</li>
          </ul>
          <h2>Google APIs</h2>
          <p>
            This app uses Google Calendar API to create events and generate Google Meet links.
            Your use of Google services is also governed by Google’s Terms of Service and Privacy Policy.
          </p>
          <h2>Disclaimer</h2>
          <p>
            The application is provided "as is" without warranties of any kind. We are not liable for
            any damages arising from the use of this app.
          </p>
          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Continued use constitutes acceptance of the updated terms.
          </p>
        </div>
      </main>
    </div>
  );
}


