import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, KeyRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Utility to check password strength
const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length > 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score < 3) return { label: 'Weak', color: 'text-red-500', width: 'w-1/3' };
  if (score < 5) return { label: 'Medium', color: 'text-yellow-500', width: 'w-2/3' };
  return { label: 'Strong', color: 'text-green-500', width: 'w-full' };
};

export default function RegisterPage() {
  const [step, setStep] = useState<'contact' | 'otp' | 'password'>('contact');
  const [contactInfo, setContactInfo] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { completeRegistration } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(password);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactInfo) {
      setStep('otp');
      setError('');
      alert(`OTP sent to ${contactInfo}. Use 123456 for demo.`);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      setStep('password');
      setError('');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (passwordStrength.label === 'Weak') {
      setError('Password is too weak. Please choose a stronger one.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await completeRegistration({ contact: contactInfo, password });
      navigate('/create-profile');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Join BookShare to start saving.</p>
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          
          {step === 'contact' && (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <label htmlFor="contact" className="font-medium text-gray-700">Email or Mobile</label>
              <input id="contact" type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Enter your email or mobile" required />
              <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold">Send OTP</button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <label htmlFor="otp" className="font-medium text-gray-700">Enter OTP</label>
              <input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 border rounded-lg text-center tracking-widest" placeholder="000000" required />
              <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold">Verify OTP</button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="font-medium text-gray-700">Set Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg mt-1" placeholder="Enter a strong password" required />
                {password && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${passwordStrength.width} ${passwordStrength.color.replace('text', 'bg')}`}></div>
                    </div>
                    <p className={`text-xs mt-1 ${passwordStrength.color}`}>Password strength: {passwordStrength.label}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="font-medium text-gray-700">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 border rounded-lg mt-1" placeholder="Confirm your password" required />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold disabled:opacity-50">
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}