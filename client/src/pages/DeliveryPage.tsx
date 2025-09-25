// import React, { useState } from 'react';
// import { Package, MapPin, Clock, CheckCircle, Truck, Phone } from 'lucide-react';

// interface DeliveryItem {
//   id: string;
//   type: 'pickup' | 'delivery' | 'return';
//   bookTitle: string;
//   address: string;
//   customerName: string;
//   customerPhone: string;
//   status: 'assigned' | 'en-route' | 'completed';
//   estimatedTime: string;
//   specialInstructions?: string;
// }

// export default function DeliveryPage() {
//   const [activeTab, setActiveTab] = useState<'partner' | 'customer'>('customer');

//   const customerDeliveries: DeliveryItem[] = [
//     {
//       id: '1',
//       type: 'delivery',
//       bookTitle: 'Physics Class 12 NCERT',
//       address: '123 Student Hostel, Delhi University',
//       customerName: 'Rahul Sharma',
//       customerPhone: '+91 98765 43210',
//       status: 'en-route',
//       estimatedTime: '2:30 PM',
//       specialInstructions: 'Call before arriving',
//     },
//     {
//       id: '2',
//       type: 'return',
//       bookTitle: 'Organic Chemistry Morrison Boyd',
//       address: '456 PG Accommodation, Karol Bagh',
//       customerName: 'Rahul Sharma',
//       customerPhone: '+91 98765 43210',
//       status: 'assigned',
//       estimatedTime: '4:00 PM',
//     },
//   ];

//   const partnerDeliveries: DeliveryItem[] = [
//     {
//       id: '3',
//       type: 'pickup',
//       bookTitle: 'Mathematics JEE Advanced',
//       address: '789 Apartment Complex, Lajpat Nagar',
//       customerName: 'Priya Patel',
//       customerPhone: '+91 87654 32109',
//       status: 'assigned',
//       estimatedTime: '11:00 AM',
//     },
//     {
//       id: '4',
//       type: 'delivery',
//       bookTitle: 'Computer Science Class 11',
//       address: '321 Boys Hostel, IIT Delhi',
//       customerName: 'Amit Singh',
//       customerPhone: '+91 76543 21098',
//       status: 'completed',
//       estimatedTime: '1:00 PM',
//     },
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'assigned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'en-route': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'completed': return 'bg-green-100 text-green-800 border-green-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case 'pickup': return <Package className="h-5 w-5 text-orange-600" />;
//       case 'delivery': return <Truck className="h-5 w-5 text-blue-600" />;
//       case 'return': return <Package className="h-5 w-5 text-green-600" />;
//       default: return <Package className="h-5 w-5" />;
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Delivery Tracking</h1>
//         <p className="text-gray-600">Track your book pickups, deliveries, and returns</p>
//       </div>
//       {/* Tabs */}
//       <div className="mb-8 flex items-center space-x-2">
//         <button
//           onClick={() => setActiveTab('customer')}
//           className={`relative py-2 px-6 rounded-t-xl font-semibold transition
//             ${activeTab === 'customer'
//               ? 'bg-blue-50 text-blue-700 shadow border-b-2 border-blue-500'
//               : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50'
//             }`}
//         >
//           My Deliveries
//           <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'customer' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
//             {customerDeliveries.length}
//           </span>
//         </button>
//         <button
//           onClick={() => setActiveTab('partner')}
//           className={`relative py-2 px-6 rounded-t-xl font-semibold transition
//             ${activeTab === 'partner'
//               ? 'bg-blue-50 text-blue-700 shadow border-b-2 border-blue-500'
//               : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50'
//             }`}
//         >
//           Partner Dashboard
//           <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'partner' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
//             {partnerDeliveries.length}
//           </span>
//         </button>
//       </div>

//       {/* Customer View */}
//       {activeTab === 'customer' && (
//         <div className="space-y-7">
//           {customerDeliveries.map((delivery) => (
//             <div key={delivery.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
//               <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                 <div className="flex items-start gap-4">
//                   <div className="bg-blue-100 p-3 rounded-xl">
//                     {getTypeIcon(delivery.type)}
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="text-lg font-bold text-gray-900">
//                         {delivery.type === 'delivery'
//                           ? 'Incoming Delivery'
//                           : delivery.type === 'return'
//                             ? 'Return Pickup'
//                             : 'Pickup Task'}
//                       </h3>
//                       <span className={`px-3 py-1 ml-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusColor(delivery.status)}`}>
//                         {delivery.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
//                       </span>
//                     </div>
//                     <div className="text-gray-600 text-[15px] mb-1 font-medium">{delivery.bookTitle}</div>
//                     <div className="flex items-center text-sm text-gray-500 mb-1">
//                       <MapPin className="h-4 w-4 mr-1" />
//                       <span>{delivery.address}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-500 mb-1">
//                       <Clock className="h-4 w-4 mr-1" />
//                       <span>Estimated: {delivery.estimatedTime}</span>
//                     </div>
//                     <div className="text-xs text-gray-400">For: {delivery.customerName}</div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-2 min-w-[135px] justify-end">
//                   <button
//                     onClick={() => window.open(`/delivery/${delivery.id}`, '_blank')}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
//                   >
//                     Track Delivery
//                   </button>
//                 </div>
//               </div>
//               {delivery.specialInstructions && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                   <span className="text-blue-800 font-medium">Special: </span>
//                   <span className="text-blue-700 text-sm">{delivery.specialInstructions}</span>
//                 </div>
//               )}
//               {delivery.status === 'en-route' && (
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-2">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Truck className="h-4 w-4 text-green-600" />
//                     <span className="font-bold text-green-900">On the way!</span>
//                   </div>
//                   <p className="text-green-800 text-sm pb-2">
//                     Your delivery partner is heading to you and will call on arrival.
//                   </p>
//                   <button
//                     className="flex items-center space-x-2 text-green-700 hover:text-green-900 font-medium"
//                     onClick={() => window.open('tel:+919999988888')}
//                   >
//                     <Phone className="h-4 w-4" />
//                     <span>Call Partner: +91 99999 88888</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}

//           {customerDeliveries.length === 0 && (
//             <div className="text-center py-20">
//               <Package className="h-16 w-16 text-blue-200 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No active deliveries</h3>
//               <p className="text-gray-600">Your delivery tracking will appear here</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Partner View */}
//       {activeTab === 'partner' && (
//         <div>
//           {/* Stats Row */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
//             <div className="bg-blue-50 p-5 rounded-2xl shadow border border-blue-100 flex flex-col items-center text-center">
//               <Package className="h-7 w-7 text-blue-500 mb-2" />
//               <p className="text-xs text-blue-600 font-semibold">Today's Tasks</p>
//               <p className="text-xl font-bold text-blue-800">8</p>
//             </div>
//             <div className="bg-green-50 p-5 rounded-2xl shadow border border-green-100 flex flex-col items-center text-center">
//               <CheckCircle className="h-7 w-7 text-green-500 mb-2" />
//               <p className="text-xs text-green-600 font-semibold">Completed</p>
//               <p className="text-xl font-bold text-green-900">5</p>
//             </div>
//             <div className="bg-orange-50 p-5 rounded-2xl shadow border border-orange-100 flex flex-col items-center text-center">
//               <Clock className="h-7 w-7 text-orange-500 mb-2" />
//               <p className="text-xs text-orange-600 font-semibold">Earnings</p>
//               <p className="text-xl font-bold text-orange-700">₹480</p>
//             </div>
//             <div className="bg-yellow-50 p-5 rounded-2xl shadow border border-yellow-100 flex flex-col items-center text-center">
//               <CheckCircle className="h-7 w-7 text-yellow-500 mb-2" />
//               <p className="text-xs text-yellow-600 font-semibold">Rating</p>
//               <p className="text-xl font-bold text-yellow-700">4.8</p>
//             </div>
//           </div>
//           {/* Delivery Tasks */}
//           <div className="space-y-7">
//             {partnerDeliveries.map((delivery) => (
//               <div key={delivery.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-3">
//                 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                   <div className="flex items-start gap-4">
//                     <div className="bg-blue-100 p-3 rounded-xl">{getTypeIcon(delivery.type)}</div>
//                     <div>
//                       <div className="flex items-center gap-2 mb-1">
//                         <h3 className="text-lg font-bold text-gray-900">
//                           {delivery.type.charAt(0).toUpperCase() + delivery.type.slice(1)} Task
//                         </h3>
//                         <span className={`px-3 py-1 ml-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusColor(delivery.status)}`}>
//                           {delivery.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
//                         </span>
//                       </div>
//                       <div className="text-gray-600 text-[15px] mb-1 font-medium">{delivery.bookTitle}</div>
//                       <div className="flex items-center text-sm text-gray-500 mb-1">
//                         <MapPin className="h-4 w-4 mr-1" />
//                         <span>{delivery.address}</span>
//                       </div>
//                       <div className="flex items-center text-sm text-gray-500 mb-1">
//                         <Clock className="h-4 w-4 mr-1" />
//                         <span>Scheduled: {delivery.estimatedTime}</span>
//                       </div>
//                       <div className="flex items-center text-sm text-gray-500">
//                         <Phone className="h-4 w-4 mr-1" />
//                         <span>{delivery.customerPhone}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="min-w-[135px] flex flex-col gap-2 justify-end">
//                     {delivery.status === 'assigned' && (
//                       <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition w-full">
//                         Start Task
//                       </button>
//                     )}
//                     <button
//                       className="border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition w-full"
//                       onClick={() => window.open(`tel:${delivery.customerPhone.replace(/[^+\d]/g, '')}`)}
//                     >
//                       Call Customer
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {partnerDeliveries.length === 0 && (
//               <div className="text-center py-20">
//                 <Package className="h-16 w-16 text-blue-200 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No partner assignments</h3>
//                 <p className="text-gray-600">All partner delivery tasks will show here</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }












import React, { useState } from 'react';
import { Package, MapPin, Clock, CheckCircle, Truck, Phone } from 'lucide-react';

interface DeliveryItem {
  id: string;
  type: 'pickup' | 'delivery' | 'return';
  bookTitle: string;
  address: string;
  customerName: string;
  customerPhone: string;
  status: 'assigned' | 'en-route' | 'completed';
  estimatedTime: string;
  specialInstructions?: string;
}

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState<'partner' | 'customer'>('customer');

  const customerDeliveries: DeliveryItem[] = [
    {
      id: '1',
      type: 'delivery',
      bookTitle: 'Physics Class 12 NCERT',
      address: '123 Student Hostel, Delhi University',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98765 43210',
      status: 'en-route',
      estimatedTime: '2:30 PM',
      specialInstructions: 'Call before arriving',
    },
    {
      id: '2',
      type: 'return',
      bookTitle: 'Organic Chemistry Morrison Boyd',
      address: '456 PG Accommodation, Karol Bagh',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98765 43210',
      status: 'assigned',
      estimatedTime: '4:00 PM',
    },
  ];

  const partnerDeliveries: DeliveryItem[] = [
    {
      id: '3',
      type: 'pickup',
      bookTitle: 'Mathematics JEE Advanced',
      address: '789 Apartment Complex, Lajpat Nagar',
      customerName: 'Priya Patel',
      customerPhone: '+91 87654 32109',
      status: 'assigned',
      estimatedTime: '11:00 AM',
    },
    {
      id: '4',
      type: 'delivery',
      bookTitle: 'Computer Science Class 11',
      address: '321 Boys Hostel, IIT Delhi',
      customerName: 'Amit Singh',
      customerPhone: '+91 76543 21098',
      status: 'completed',
      estimatedTime: '1:00 PM',
    },
  ];

  // Always returns bg, text and border for both modes
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-300/10 dark:text-yellow-300 dark:border-yellow-500/40';
      case 'en-route':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-300/10 dark:text-blue-300 dark:border-blue-500/40';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-300/10 dark:text-green-300 dark:border-green-500/40';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pickup': return <Package className="h-5 w-5 text-orange-600 dark:text-orange-300" />;
      case 'delivery': return <Truck className="h-5 w-5 text-blue-600 dark:text-blue-300" />;
      case 'return': return <Package className="h-5 w-5 text-green-600 dark:text-green-300" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Delivery Tracking</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your book pickups, deliveries, and returns</p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex items-center space-x-2">
        <button
          onClick={() => setActiveTab('customer')}
          className={`relative py-2 px-6 rounded-t-xl font-semibold transition
            ${activeTab === 'customer'
              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-cyan-300 shadow border-b-2 border-blue-500 dark:border-cyan-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-blue-50 dark:hover:bg-blue-900/40'
            }`}
        >
          My Deliveries
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'customer'
            ? 'bg-blue-100 dark:bg-cyan-800/40 text-blue-700 dark:text-cyan-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
            {customerDeliveries.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('partner')}
          className={`relative py-2 px-6 rounded-t-xl font-semibold transition
            ${activeTab === 'partner'
              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-cyan-300 shadow border-b-2 border-blue-500 dark:border-cyan-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-blue-50 dark:hover:bg-blue-900/40'
            }`}
        >
          Partner Dashboard
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === 'partner'
            ? 'bg-blue-100 dark:bg-cyan-800/40 text-blue-700 dark:text-cyan-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
            {partnerDeliveries.length}
          </span>
        </button>
      </div>

      {/* Customer View */}
      {activeTab === 'customer' && (
        <div className="space-y-7">
          {customerDeliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-xl">
                    {getTypeIcon(delivery.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {delivery.type === 'delivery'
                          ? 'Incoming Delivery'
                          : delivery.type === 'return'
                            ? 'Return Pickup'
                            : 'Pickup Task'}
                      </h3>
                      <span className={`px-3 py-1 ml-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusColor(delivery.status)}`}>
                        {delivery.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-[15px] mb-1 font-medium">{delivery.bookTitle}</div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{delivery.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Estimated: {delivery.estimatedTime}</span>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">For: {delivery.customerName}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[135px] justify-end">
                  <button
                    onClick={() => window.open(`/delivery/${delivery.id}`, '_blank')}
                    className="w-full bg-blue-600 dark:bg-cyan-600 hover:bg-blue-700 dark:hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Track Delivery
                  </button>
                </div>
              </div>
              {delivery.specialInstructions && (
                <div className="bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-cyan-700 rounded-lg p-3">
                  <span className="text-blue-800 dark:text-cyan-300 font-medium">Special: </span>
                  <span className="text-blue-700 dark:text-cyan-200 text-sm">{delivery.specialInstructions}</span>
                </div>
              )}
              {delivery.status === 'en-route' && (
                <div className="bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-green-600 dark:text-green-300" />
                    <span className="font-bold text-green-900 dark:text-green-200">On the way!</span>
                  </div>
                  <p className="text-green-800 dark:text-green-200 text-sm pb-2">
                    Your delivery partner is heading to you and will call on arrival.
                  </p>
                  <button
                    className="flex items-center space-x-2 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-200 font-medium"
                    onClick={() => window.open('tel:+919999988888')}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Partner: +91 99999 88888</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {customerDeliveries.length === 0 && (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-blue-200 dark:text-blue-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No active deliveries</h3>
              <p className="text-gray-600 dark:text-gray-400">Your delivery tracking will appear here</p>
            </div>
          )}
        </div>
      )}

      {/* Partner View */}
      {activeTab === 'partner' && (
        <div>
          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
            <div className="bg-blue-50 dark:bg-blue-900/40 p-5 rounded-2xl shadow border border-blue-100 dark:border-blue-800 flex flex-col items-center text-center">
              <Package className="h-7 w-7 text-blue-500 dark:text-blue-300 mb-2" />
              <p className="text-xs text-blue-600 dark:text-cyan-300 font-semibold">Today's Tasks</p>
              <p className="text-xl font-bold text-blue-800 dark:text-blue-100">8</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/40 p-5 rounded-2xl shadow border border-green-100 dark:border-green-800 flex flex-col items-center text-center">
              <CheckCircle className="h-7 w-7 text-green-500 dark:text-green-300 mb-2" />
              <p className="text-xs text-green-600 dark:text-green-300 font-semibold">Completed</p>
              <p className="text-xl font-bold text-green-900 dark:text-green-100">5</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/40 p-5 rounded-2xl shadow border border-orange-100 dark:border-orange-800 flex flex-col items-center text-center">
              <Clock className="h-7 w-7 text-orange-500 dark:text-orange-400 mb-2" />
              <p className="text-xs text-orange-600 dark:text-orange-300 font-semibold">Earnings</p>
              <p className="text-xl font-bold text-orange-700 dark:text-orange-200">₹480</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/40 p-5 rounded-2xl shadow border border-yellow-100 dark:border-yellow-800 flex flex-col items-center text-center">
              <CheckCircle className="h-7 w-7 text-yellow-500 dark:text-yellow-300 mb-2" />
              <p className="text-xs text-yellow-600 dark:text-yellow-300 font-semibold">Rating</p>
              <p className="text-xl font-bold text-yellow-700 dark:text-yellow-200">4.8</p>
            </div>
          </div>
          {/* Delivery Tasks */}
          <div className="space-y-7">
            {partnerDeliveries.map((delivery) => (
              <div key={delivery.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-xl">{getTypeIcon(delivery.type)}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {delivery.type.charAt(0).toUpperCase() + delivery.type.slice(1)} Task
                        </h3>
                        <span className={`px-3 py-1 ml-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusColor(delivery.status)}`}>
                          {delivery.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-[15px] mb-1 font-medium">{delivery.bookTitle}</div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{delivery.address}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Scheduled: {delivery.estimatedTime}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{delivery.customerPhone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-[135px] flex flex-col gap-2 justify-end">
                    {delivery.status === 'assigned' && (
                      <button className="bg-blue-600 dark:bg-cyan-600 hover:bg-blue-700 dark:hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-lg transition w-full">
                        Start Task
                      </button>
                    )}
                    <button
                      className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition w-full"
                      onClick={() => window.open(`tel:${delivery.customerPhone.replace(/[^+\d]/g, '')}`)}
                    >
                      Call Customer
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {partnerDeliveries.length === 0 && (
              <div className="text-center py-20">
                <Package className="h-16 w-16 text-blue-200 dark:text-blue-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No partner assignments</h3>
                <p className="text-gray-600 dark:text-gray-400">All partner delivery tasks will show here</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
