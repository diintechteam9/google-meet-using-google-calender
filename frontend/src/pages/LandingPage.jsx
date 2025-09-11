import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Check, Shield, Calendar, Video } from 'lucide-react';

export default function LandingPage(){
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1 w-full">
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-blue-600 text-white"><Calendar className="w-3 h-3" /></span>
                Google Calendar + Meet
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Create Meet links straight from your calendar
              </h1>
              <p className="mt-4 text-gray-600 text-base md:text-lg max-w-prose">
                Sign in with Google and schedule events in a click. We handle OAuth securely and attach a Google Meet link automatically.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3"><Check className="mt-0.5 w-4 h-4 text-green-600" /> Quick Google sign-in</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 w-4 h-4 text-green-600" /> Auto-generated Meet links</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 w-4 h-4 text-green-600" /> No hassles, just events</li>
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <Link to="/login" className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto shadow">
                  Sign in
                </Link>
                <p className="text-xs text-gray-500">You’ll be redirected to Google for a secure sign-in.</p>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <Shield className="inline-block w-3.5 h-3.5 mr-1" /> We only request the minimal calendar scopes needed.
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-blue-100 to-transparent blur-xl" aria-hidden="true" />
              <div className="relative border rounded-xl bg-white shadow-sm p-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white"><Video className="w-4 h-4" /></span>
                  <div>
                    <div className="font-semibold">Instant Meet link</div>
                    <div className="text-xs text-gray-500">Added to your event automatically</div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg border p-4 bg-gray-50">
                    <div className="text-gray-500">Event</div>
                    <div className="mt-1 font-medium">Team Sync</div>
                  </div>
                  <div className="rounded-lg border p-4 bg-gray-50">
                    <div className="text-gray-500">Meet</div>
                    <div className="mt-1 font-mono text-blue-700">meet.google.com/abc-defg-hij</div>
                  </div>
                  <div className="rounded-lg border p-4 bg-gray-50">
                    <div className="text-gray-500">Date</div>
                    <div className="mt-1">Tomorrow, 10:00 AM</div>
                  </div>
                  <div className="rounded-lg border p-4 bg-gray-50">
                    <div className="text-gray-500">Calendar</div>
                    <div className="mt-1">Primary</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white"><Calendar className="w-4 h-4" /></span>
              <span className="font-semibold">MERN Meet</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link to="/terms" className="hover:text-gray-900">Terms</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}




