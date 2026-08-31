import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { showAuthPrompt, dismissAuthPrompt, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  if (!showAuthPrompt) return null;

  const handleGoToLogin = () => {
    dismissAuthPrompt();
    navigate('/login');
  };

  const handleGoToSignUp = () => {
    dismissAuthPrompt();
    navigate('/signup');
  };

  const handleInstantDemo = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all duration-300 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-teal-100 overflow-hidden transform transition-all">
        {/* Decorative Top Gradient Header */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 px-6 py-7 text-white relative">
          <button
            onClick={dismissAuthPrompt}
            aria-label="Close dialog"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-teal-100">DoseGuard Security</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to DoseGuard</h2>
            </div>
          </div>
          <p className="text-teal-50 text-sm leading-relaxed mt-2">
            Please log in or create an account to unlock your personalized medication safety layer and cross-check prescriptions.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Highlight badges */}
          <div className="grid grid-cols-1 gap-3 bg-teal-50/70 p-4 rounded-2xl border border-teal-100/80">
            <div className="flex items-center text-sm font-medium text-teal-900">
              <span className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center mr-3 text-teal-600 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Instant Cross-Check for Duplicate & Interacting Drugs</span>
            </div>
            <div className="flex items-center text-sm font-medium text-teal-900">
              <span className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center mr-3 text-teal-600 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <span>256-Bit Private & Reviewable Health History</span>
            </div>
            <div className="flex items-center text-sm font-medium text-teal-900">
              <span className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center mr-3 text-teal-600 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              <span>Doctor-Ready Clinical Question Guides</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleGoToLogin}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/25 transition-all duration-200 flex items-center justify-center group"
            >
              <span>Sign In to Your Account</span>
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              onClick={handleGoToSignUp}
              className="w-full py-3 px-5 bg-white border border-teal-600 text-teal-700 hover:bg-teal-50/70 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center"
            >
              <span>Create Free Account</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Quick Preview</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button
              onClick={handleInstantDemo}
              className="w-full py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-amber-300 font-medium text-sm rounded-xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>⚡</span>
              <span>Instant Demo Account (1-Click Preview)</span>
            </button>
          </div>

          {/* Footer dismiss link */}
          <div className="text-center pt-1">
            <button
              onClick={dismissAuthPrompt}
              className="text-xs text-gray-500 hover:text-gray-700 hover:underline transition-colors"
            >
              Continue exploring as guest for now &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
