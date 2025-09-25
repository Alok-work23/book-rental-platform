// import React, { useState } from 'react';
// import { X, Upload, BookOpen } from 'lucide-react';
// import { useBooks } from '../contexts/BookContext';
// import { useAuth } from '../contexts/AuthContext';

// interface AddBookModalProps {
//   onClose: () => void;
// }

// export default function AddBookModal({ onClose }: AddBookModalProps) {
//   const { addBook } = useBooks();
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     subject: '',
//     condition: 'Good' as const,
//     type: 'rent' as const,
//     rentPrice: 0,
//     sellPrice: 0,
//     description: '',
//   });

//   const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English', 'History'];
//   const bookImages = [
//     'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg', 
//     'https://images.pexels.com/photos/1995842/pexels-photo-1995842.jpeg',
//     'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg',
//     'https://images.pexels.com/photos/159832/book-open-book-read-literature-159832.jpeg',
//     'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
//   ];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       addBook({
//         ...formData,
//         image: bookImages[Math.floor(Math.random() * bookImages.length)],
//         ownerId: user?.id || '1',
//         ownerName: user?.name || 'Unknown',
//         location: user?.address || 'Delhi, India',
//         distance: 0,
//         availability: true,
//         rating: 4.5,
//         reviews: 0,
//       });
//       setLoading(false);
//       onClose();
//     }, 1000);
//   };

//   const updateFormData = (field: string, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-900">Add New Book</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Basic Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Book Title *
//               </label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => updateFormData('title', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter book title"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Author *
//               </label>
//               <input
//                 type="text"
//                 value={formData.author}
//                 onChange={(e) => updateFormData('author', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter author name"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Subject *
//               </label>
//               <select
//                 value={formData.subject}
//                 onChange={(e) => updateFormData('subject', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               >
//                 <option value="">Select subject</option>
//                 {subjects.map(subject => (
//                   <option key={subject} value={subject}>{subject}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Condition *
//               </label>
//               <select
//                 value={formData.condition}
//                 onChange={(e) => updateFormData('condition', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               >
//                 <option value="New">New</option>
//                 <option value="Like-New">Like-New</option>
//                 <option value="Good">Good</option>
//                 <option value="Fair">Fair</option>
//                 <option value="Poor">Poor</option>
//               </select>
//             </div>
//           </div>

//           {/* Type and Pricing */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               What do you want to do? *
//             </label>
//             <div className="grid grid-cols-3 gap-3">
//               {[
//                 { value: 'rent', label: 'Rent Only' },
//                 { value: 'sell', label: 'Sell Only' },
//                 { value: 'both', label: 'Both' },
//               ].map((option) => (
//                 <button
//                   key={option.value}
//                   type="button"
//                   onClick={() => updateFormData('type', option.value)}
//                   className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
//                     formData.type === option.value
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {option.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {(formData.type === 'rent' || formData.type === 'both') && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Rent Price (per day) *
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
//                   <input
//                     type="number"
//                     min="1"
//                     value={formData.rentPrice}
//                     onChange={(e) => updateFormData('rentPrice', parseInt(e.target.value) || 0)}
//                     className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="0"
//                     required={formData.type === 'rent' || formData.type === 'both'}
//                   />
//                 </div>
//               </div>
//             )}

//             {(formData.type === 'sell' || formData.type === 'both') && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Sell Price *
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
//                   <input
//                     type="number"
//                     min="1"
//                     value={formData.sellPrice}
//                     onChange={(e) => updateFormData('sellPrice', parseInt(e.target.value) || 0)}
//                     className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="0"
//                     required={formData.type === 'sell' || formData.type === 'both'}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => updateFormData('description', e.target.value)}
//               rows={4}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Describe the condition and any important details about the book..."
//             />
//           </div>

//           {/* Photo Upload Placeholder */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Book Photos
//             </label>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//               <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//               <p className="text-gray-600 text-sm">
//                 Photos will be automatically assigned for demo purposes
//               </p>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex space-x-4 pt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   <span>Adding...</span>
//                 </>
//               ) : (
//                 <>
//                   <BookOpen className="h-4 w-4" />
//                   <span>Add Book</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }































import React, { useState } from 'react';
import { X, Upload, BookOpen } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

interface AddBookModalProps {
  onClose: () => void;
}

export default function AddBookModal({ onClose }: AddBookModalProps) {
  const { addBook } = useBooks();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: '',
    condition: 'Good' as const,
    type: 'rent' as const,
    rentPrice: 0,
    sellPrice: 0,
    description: '',
  });

  const subjects = [
    'Physics', 'Chemistry', 'Mathematics', 'Biology',
    'Computer Science', 'English', 'History',
  ];
  const bookImages = [
    'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    'https://images.pexels.com/photos/1995842/pexels-photo-1995842.jpeg',
    'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg',
    'https://images.pexels.com/photos/159832/book-open-book-read-literature-159832.jpeg',
    'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addBook({
        ...formData,
        image: bookImages[Math.floor(Math.random() * bookImages.length)],
        ownerId: user?.id || '1',
        ownerName: user?.name || 'Unknown',
        location: user?.address || 'Delhi, India',
        distance: 0,
        availability: true,
        rating: 4.5,
        reviews: 0,
      });
      setLoading(false);
      onClose();
    }, 1000);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[92vh] shadow-2xl overflow-y-auto border border-blue-100 dark:border-slate-800 relative animate-fadeIn">
        {/* Sticky/header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 flex items-center justify-between border-b border-gray-100 dark:border-slate-700 px-6 py-4 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-blue-600 drop-shadow-sm" />
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Add New Book</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
            aria-label="Close"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-7">
          {/* Title/Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter book title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => updateFormData('author', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter author name"
                required
              />
            </div>
          </div>

          {/* Subject/Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.subject}
                onChange={(e) => updateFormData('subject', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                Condition <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.condition}
                onChange={(e) => updateFormData('condition', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                {['New', 'Like-New', 'Good', 'Fair', 'Poor'].map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* What do you want to do? */}
          <div>
            <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-2">
              What do you want to do? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              {[
                { value: 'rent', label: 'Rent Only' },
                { value: 'sell', label: 'Sell Only' },
                { value: 'both', label: 'Both' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => updateFormData('type', opt.value)}
                  className={`px-5 py-2.5 rounded-full font-semibold border-2 transition
                    ${
                      formData.type === opt.value
                        ? 'border-blue-600 bg-blue-600 text-white shadow'
                        : 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 hover:border-blue-400'
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(formData.type === 'rent' || formData.type === 'both') && (
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                  Rent Price (per day) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    min={1}
                    value={formData.rentPrice}
                    onChange={(e) => updateFormData('rentPrice', parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="0"
                    required={formData.type === 'rent' || formData.type === 'both'}
                  />
                </div>
              </div>
            )}
            {(formData.type === 'sell' || formData.type === 'both') && (
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                  Sell Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    min={1}
                    value={formData.sellPrice}
                    onChange={(e) => updateFormData('sellPrice', parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="0"
                    required={formData.type === 'sell' || formData.type === 'both'}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Describe condition, edition, or any special info..."
            />
          </div>

          {/* Demo Upload Area */}
          <div>
            <label className="block text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
              Book Photos
            </label>
            <div className="border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-2xl p-7 text-center bg-blue-50/50 dark:bg-slate-800/40">
              <Upload className="h-8 w-8 text-blue-300 dark:text-blue-600 mx-auto mb-2" />
              <p className="text-blue-700 dark:text-blue-200 text-sm">
                Photos will be randomly assigned for demo.<br />
                (File upload coming soon)
              </p>
            </div>
          </div>

          {/* Form actions */}
          <div className="flex gap-3 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-700 font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow bg-gradient-to-tr from-blue-600 to-cyan-500 text-white hover:to-blue-700 transition disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                  Adding...
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add Book
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
