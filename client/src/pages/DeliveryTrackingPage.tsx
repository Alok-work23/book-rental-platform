// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useBooks, DeliveryDetails } from '../contexts/BookContext';
// import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { Truck, Package, Home, CheckCircle } from 'lucide-react';

// // Fix for default Leaflet marker icon issue with bundlers
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// export default function DeliveryTrackingPage() {
//   const { deliveryId } = useParams<{ deliveryId: string }>();
//   const { fetchDeliveryDetails } = useBooks();
//   const [delivery, setDelivery] = useState<DeliveryDetails | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getDeliveryData = () => {
//       if (!deliveryId) return;
//       fetchDeliveryDetails(deliveryId)
//         .then(data => {
//           setDelivery(data);
//           setLoading(false);
//         });
//     };

//     getDeliveryData();
//     // Set up polling to fetch updates every 10 seconds
//     const interval = setInterval(getDeliveryData, 10000);
//     return () => clearInterval(interval);
//   }, [deliveryId, fetchDeliveryDetails]);

//   if (loading) {
//     return <div className="text-center py-20">Loading delivery details...</div>;
//   }

//   if (!delivery) {
//     return <div className="text-center py-20">Could not find delivery details.</div>;
//   }

//   const currentPosition = delivery.locationUpdates[delivery.locationUpdates.length - 1];
//   const routeCoordinates = delivery.locationUpdates.map(loc => [loc.lat, loc.lng]);

//   const statusTimeline = [
//     { name: 'Assigned', status: 'assigned' },
//     { name: 'Picked Up', status: 'picked-up' },
//     { name: 'In Transit', status: 'in-transit' },
//     { name: 'Delivered', status: 'delivered' },
//   ];
//   const currentStatusIndex = statusTimeline.findIndex(s => s.status === delivery.status);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold mb-2">Delivery Tracking</h1>
//       <p className="text-gray-600 dark:text-gray-400 mb-6">Tracking order for: <span className="font-semibold">{delivery.bookTitle}</span></p>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column: Map */}
//         <div className="lg:col-span-2 h-96 lg:h-auto rounded-xl overflow-hidden">
//           <MapContainer center={[currentPosition.lat, currentPosition.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <Polyline positions={routeCoordinates as L.LatLngExpression[]} color="blue" />
//             <Marker position={[currentPosition.lat, currentPosition.lng]}>
//               <Popup>Current Location</Popup>
//             </Marker>
//           </MapContainer>
//         </div>

//         {/* Right Column: Details */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
//           <h2 className="text-xl font-semibold mb-4">Order Status: <span className="capitalize text-blue-600 dark:text-cyan-400">{delivery.status.replace('-', ' ')}</span></h2>
          
//           {/* Status Timeline */}
//           <div className="space-y-4 mb-6">
//             {statusTimeline.map((item, index) => (
//               <div key={item.status} className="flex items-center">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${index <= currentStatusIndex ? 'bg-blue-600 dark:bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
//                   {index < currentStatusIndex ? <CheckCircle size={20}/> : <Package size={20}/>}
//                 </div>
//                 <span className={`font-medium ${index <= currentStatusIndex ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{item.name}</span>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//             <p className="font-semibold">Estimated Arrival</p>
//             <p>{new Date(delivery.estimatedArrival).toLocaleString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks, DeliveryDetails } from '../contexts/BookContext';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Package, CheckCircle, AlertCircle } from 'lucide-react';

// This is a common fix for a known issue with Webpack and Leaflet default icons
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function DeliveryTrackingPage() {
  const { deliveryId } = useParams<{ deliveryId: string }>();
  const { fetchDeliveryDetails } = useBooks();
  const [delivery, setDelivery] = useState<DeliveryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const previousStatus = useRef<string>('');

  useEffect(() => {
    const getDeliveryData = async () => {
      if (!deliveryId) return;
      try {
        setError(null);
        const data = await fetchDeliveryDetails(deliveryId);
        if (data) {
          // Check for status changes and show notification
          if (previousStatus.current && previousStatus.current !== data.status) {
            const statusMessages = {
              'assigned': 'Your delivery has been assigned to a partner!',
              'picked-up': 'Your book has been picked up!',
              'in-transit': 'Your book is on the way!',
              'delivered': 'Your book has been delivered!',
            };
            const message = statusMessages[data.status as keyof typeof statusMessages];
            if (message) {
              alert(message); // In production, use a proper notification system
            }
          }
          previousStatus.current = data.status;
          setDelivery(data);
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch delivery details');
        setLoading(false);
      }
    };

    getDeliveryData();
    // Poll for updates every 10 seconds
    const interval = setInterval(getDeliveryData, 10000);
    return () => clearInterval(interval);
  }, [deliveryId, fetchDeliveryDetails]);

  // Countdown timer effect
  useEffect(() => {
    if (!delivery?.estimatedArrival) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const arrival = new Date(delivery.estimatedArrival).getTime();
      const difference = arrival - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setTimeRemaining('Arriving soon');
      }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(countdownInterval);
  }, [delivery?.estimatedArrival]);

  if (loading) {
    return <div className="text-center py-20 text-gray-600 dark:text-gray-400">Loading delivery details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Loading Delivery</h2>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!delivery) {
    return <div className="text-center py-20 text-gray-600 dark:text-gray-400">Could not find delivery details for this order.</div>;
  }

  const currentPosition = delivery.locationUpdates[delivery.locationUpdates.length - 1];
  const routeCoordinates = delivery.locationUpdates.map(loc => [loc.lat, loc.lng]);

  const statusTimeline = [
    { name: 'Assigned', status: 'assigned' },
    { name: 'Picked Up', status: 'picked-up' },
    { name: 'In Transit', status: 'in-transit' },
    { name: 'Delivered', status: 'delivered' },
  ];
  const currentStatusIndex = statusTimeline.findIndex(s => s.status === delivery.status);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Delivery Tracking</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Tracking order for: <span className="font-semibold">{delivery.bookTitle}</span></p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-96 lg:h-[600px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <MapContainer center={[currentPosition.lat, currentPosition.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline positions={routeCoordinates as L.LatLngExpression[]} color="#3b82f6" />
            
            {/* Delivery Partner Current Location */}
            <Marker position={[currentPosition.lat, currentPosition.lng]}>
              <Popup>
                <div>
                  <strong>Delivery Partner</strong><br />
                  Current Location<br />
                  <small>{new Date(currentPosition.timestamp).toLocaleTimeString()}</small>
                </div>
              </Popup>
            </Marker>
            
            {/* Seller Location */}
            {delivery.sellerLocation && (
              <Marker position={[delivery.sellerLocation.lat, delivery.sellerLocation.lng]}>
                <Popup>
                  <div>
                    <strong>Seller Location</strong><br />
                    {delivery.sellerLocation.address}
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Buyer Location */}
            {delivery.buyerLocation && (
              <Marker position={[delivery.buyerLocation.lat, delivery.buyerLocation.lng]}>
                <Popup>
                  <div>
                    <strong>Delivery Address</strong><br />
                    {delivery.buyerLocation.address}
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Status: <span className="capitalize text-blue-600 dark:text-cyan-400">{delivery.status.replace('-', ' ')}</span></h2>
          
          <div className="space-y-4 mb-6">
            {statusTimeline.map((item, index) => (
              <div key={item.status} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${index <= currentStatusIndex ? 'bg-blue-600 dark:bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                  {index < currentStatusIndex ? <CheckCircle size={20}/> : <Package size={20}/>}
                </div>
                <span className={`font-medium ${index <= currentStatusIndex ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{item.name}</span>
              </div>
            ))}
          </div>
          
          <div className="text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 dark:text-white">Estimated Arrival</p>
            <p className="text-gray-600 dark:text-gray-300">{new Date(delivery.estimatedArrival).toLocaleString()}</p>
            {timeRemaining && (
              <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900 rounded">
                <p className="text-blue-800 dark:text-blue-200 font-medium">Time Remaining: {timeRemaining}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}