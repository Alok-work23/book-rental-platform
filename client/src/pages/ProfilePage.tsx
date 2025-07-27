import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Shield, Star, Edit3, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // FIX #1: The state now correctly uses 'address' instead of 'location'.
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // This hook ensures the form data is always in sync with the user state.
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // FIX #2: The handleSave function is now implemented to update the profile data.
  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };
  
  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Verification Status</span>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Verified</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">User Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.8 (24 reviews)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium">Jan 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <button onClick={() => setIsEditing(!isEditing)} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? <input name="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" /> : <div className="flex items-center space-x-2 py-3"><User className="h-4 w-4 text-gray-400" /><span>{user?.name}</span></div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                {isEditing ? <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" /> : <div className="flex items-center space-x-2 py-3"><Mail className="h-4 w-4 text-gray-400" /><span>{user?.email}</span></div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" /> : <div className="flex items-center space-x-2 py-3"><Phone className="h-4 w-4 text-gray-400" /><span>{user?.phone}</span></div>}
              </div>
              <div>
                {/* FIX #3: Label and value are now correctly set to 'address'. */}
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? <input name="address" type="text" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" /> : <div className="flex items-center space-x-2 py-3"><MapPin className="h-4 w-4 text-gray-400" /><span>{user?.address}</span></div>}
              </div>
            </div>
            {isEditing && (
              <div className="flex space-x-4 mt-6">
                <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                  Save Changes
                </button>
                <button onClick={handleCancel} className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* === THE FOLLOWING SECTIONS ARE NOW CORRECTLY INCLUDED === */}

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
              <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
                Add Payment Method
              </button>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/25</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Primary
                  </span>
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <CreditCard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Add a new payment method</p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates about your orders</p>
                </div>
                <button className="bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Get delivery updates via SMS</p>
                </div>
                <button className="bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Location Access</p>
                  <p className="text-sm text-gray-600">Help find nearby books</p>
                </div>
                <button className="bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
