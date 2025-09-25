import React, { useState } from "react";
import { User, Mail, Phone, Lock, Bell, Moon, Sun, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: "Rahul Sharma",
    email: "rahul@student.com",
    phone: "+91 98765 43210",
    notifications: true,
    theme: "system"
  });
  const [showDelete, setShowDelete] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 px-4 py-10 flex justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8">

        <h1 className="text-2xl font-bold mb-7 text-gray-900 dark:text-white">
          Settings
        </h1>

        {/* Basic Profile */}
        <div className="space-y-6 mb-10">
          <div>
            <label className="block mb-1 font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <User className="h-5 w-5" /> Name
            </label>
            <input
              type="text"
              className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
              value={form.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Mail className="h-5 w-5" /> Email
            </label>
            <input
              type="email"
              className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
              value={form.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Phone className="h-5 w-5" /> Phone
            </label>
            <input
              type="tel"
              className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
              value={form.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Security & Preferences */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-gray-900 dark:text-white">Notifications</span>
            </div>
            <input
              type="checkbox"
              name="notifications"
              checked={form.notifications}
              onChange={handleChange}
              className="scale-125 accent-blue-600 dark:accent-cyan-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {form.theme === "dark" ? (
                <Moon className="h-5 w-5 text-yellow-400" />
              ) : (
                <Sun className="h-5 w-5 text-blue-400" />
              )}
              <span className="font-semibold text-gray-900 dark:text-white">Theme</span>
            </div>
            <select
              className="rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-2 font-medium"
              name="theme"
              value={form.theme}
              onChange={handleChange}
            >
              <option value="system">System Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-cyan-900/60 text-blue-700 dark:text-cyan-200 font-semibold border border-blue-200 dark:border-cyan-800 hover:bg-blue-100 dark:hover:bg-cyan-950 transition"
              onClick={() => alert("Feature coming soon!")}
            >
              <Lock className="h-5 w-5" /> Change Password
            </button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="mb-8">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-semibold border border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-950 transition"
            onClick={() => setShowDelete(true)}
          >
            <Trash2 className="h-5 w-5" /> Delete Account
          </button>
        </div>

        <div className="flex gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-xl"
            onClick={() => alert("Settings saved! (Implement save logic)")}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-8 py-2 rounded-xl"
            onClick={() => alert("Changes reverted!")}
          >
            Cancel
          </button>
        </div>

        {/* Delete Account Modal */}
        {showDelete && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-sm w-full">
              <div className="flex items-center gap-2 mb-3">
                <Trash2 className="h-6 w-6 text-red-500" />
                <span className="text-lg font-bold text-red-700 dark:text-red-300">Delete Account</span>
              </div>
              <p className="mb-5 text-gray-700 dark:text-gray-200">
                Are you sure? This action <b>cannot be undone</b> and will erase your profile, listings, earnings, and history forever.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDelete(false)}
                  className="px-5 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setShowDelete(false); alert("Account deleted (implement logic!)"); }}
                  className="px-5 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
