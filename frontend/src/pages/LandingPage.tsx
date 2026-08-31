import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import AppLayout from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const { isAuthenticated, user, setShowAuthPrompt, loginAsDemo } = useAuth();

  return (
    <AppLayout showSidebar={false}>
      <div className="flex flex-col min-h-screen -m-6 lg:-m-8">
        {/* Top Suggestion / Welcome Announcement Banner */}
        {!isAuthenticated && (
          <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white px-4 py-3 text-xs sm:text-sm border-b border-teal-800/40">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-400 text-slate-950 uppercase tracking-wide">
                  Attention
                </span>
                <span className="text-slate-200">
                  New visitor? <strong>Please sign in or create an account</strong> to save your prescriptions & safety cross-checks.
                </span>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <Link
                  to="/login"
                  className="text-teal-300 hover:text-white font-semibold underline text-xs"
                >
                  Sign In
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  to="/signup"
                  className="px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
                >
                  Register Free
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-teal-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900 tracking-tight">DoseGuard</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-teal-600">Safety Layer</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
              <a href="#features" className="hover:text-teal-600 transition-colors">Features</a>
              <Link to="/safety" className="hover:text-teal-600 transition-colors">Safety Scanner</Link>
              <Link to="/demo" className="hover:text-teal-600 transition-colors">Interactive Demo</Link>
              <Link to="/help" className="hover:text-teal-600 transition-colors">Clinical FAQ</Link>
            </nav>

            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="primary" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md">
                    Go to Dashboard &rarr;
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-4 py-2 text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md shadow-teal-600/20 transition-all">
                      Get Started Free
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/50">
          <div className="max-w-4xl mx-auto text-center">
            {/* Prompt Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Medication Safety for Every Family</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              Your prescription shouldn't require a <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">medical degree</span> to understand.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              DoseGuard turns scattered medication papers and bottles into a synchronized, reviewable medication safety profile with instant conflict alerts.
            </p>
            
            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/signup">
                <Button size="lg" variant="primary" className="w-full sm:w-auto px-8 py-4 text-base font-bold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-xl shadow-teal-600/25 rounded-2xl">
                  Create Free Safety Profile &rarr;
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-base font-semibold border-2 border-teal-600 text-teal-700 hover:bg-teal-50 rounded-2xl">
                  Sign In to Account
                </Button>
              </Link>
              <button
                onClick={() => {
                  loginAsDemo();
                  window.location.href = '/dashboard';
                }}
                className="w-full sm:w-auto px-6 py-4 text-base font-semibold bg-slate-900 hover:bg-black text-amber-300 rounded-2xl shadow-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>⚡</span>
                <span>Try Demo Account</span>
              </button>
            </div>

            {/* Quick reminder message */}
            <div className="mb-14">
              <button
                onClick={() => setShowAuthPrompt(true)}
                className="text-xs text-teal-700 hover:text-teal-900 font-medium hover:underline inline-flex items-center space-x-1"
              >
                <span>Why is sign-in recommended before uploading? Click here to learn more</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Trust Strip */}
            <div className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/80 mb-16">
              <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Prescription extraction</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Multi-Doctor Cross-Check</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Clinician-Ready Questions</span>
              </div>
            </div>

            {/* Features Grid */}
            <div id="features" className="grid md:grid-cols-3 gap-8 mb-16 text-left">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 text-teal-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">01. Understand</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Turn prescriptions into structured medication information that's easy to read, track, and share.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">02. Cross-check</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Identify potential duplicates, interaction signals, and conflicting dosages worth reviewing.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 text-cyan-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">03. Discuss</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Turn findings into clear, respectful questions for your doctor or pharmacist.
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 rounded-3xl p-8 md:p-14 text-center text-white mb-16 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to secure your medicines?</h2>
                <p className="text-lg text-teal-100 mb-8 max-w-xl mx-auto">
                  Create your profile today or log in to run an automated check on your current medication regimen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-teal-800 hover:bg-gray-100 font-bold px-8 py-3.5 rounded-xl border-none shadow-md">
                      Get Started Now (Free)
                    </Button>
                  </Link>
                  <Link to="/login">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-teal-600/40 hover:bg-teal-600/60 border border-teal-400/50 text-white font-semibold rounded-xl transition-all">
                      Existing Member Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">DoseGuard</span>
            </div>
            <p className="mb-4 text-slate-300 text-sm">
              A second pair of eyes for every prescription.
            </p>
            <div className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
              <p>DoseGuard provides informational safety support and does not diagnose conditions, prescribe medicines, or replace professional medical advice.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
};

export default LandingPage;