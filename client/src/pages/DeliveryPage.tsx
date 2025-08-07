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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en-route': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pickup': return <Package className="h-5 w-5 text-orange-600" />;
      case 'delivery': return <Truck className="h-5 w-5 text-blue-600" />;
      case 'return': return <Package className="h-5 w-5 text-green-600" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Tracking</h1>
        <p className="text-gray-600">Track your book pickups, deliveries, and returns</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('customer')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'customer'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Deliveries
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {customerDeliveries.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'partner'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Partner Dashboard
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {partnerDeliveries.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Customer View */}
      {activeTab === 'customer' && (
        <div className="space-y-6">
          {customerDeliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    {getTypeIcon(delivery.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {delivery.type === 'delivery' ? 'Incoming Delivery' : 'Return Pickup'}
                    </h3>
                    <p className="text-gray-600 mb-2">{delivery.bookTitle}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{delivery.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Estimated: {delivery.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(delivery.status)}`}>
                  {delivery.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              </div>

              {delivery.specialInstructions && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Special Instructions:</strong> {delivery.specialInstructions}
                  </p>
                </div>
              )}

              {delivery.status === 'en-route' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">On the way!</span>
                  </div>
                  <p className="text-sm text-green-800 mb-3">
                    Your delivery partner is heading to your location. They'll call you when they arrive.
                  </p>
                  <button className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">Call Partner: +91 99999 88888</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {customerDeliveries.length === 0 && (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No active deliveries</h3>
              <p className="text-gray-600">Your delivery tracking will appear here</p>
            </div>
          )}
        </div>
      )}

      {/* Partner View */}
      {activeTab === 'partner' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Today's Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">₹480</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
                <CheckCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Delivery Tasks */}
          <div className="space-y-4">
            {partnerDeliveries.map((delivery) => (
              <div key={delivery.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      {getTypeIcon(delivery.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {delivery.type.charAt(0).toUpperCase() + delivery.type.slice(1)} Task
                      </h3>
                      <p className="text-gray-600 mb-2">{delivery.bookTitle}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{delivery.address}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Scheduled: {delivery.estimatedTime}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{delivery.customerPhone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(delivery.status)}`}>
                    {delivery.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>

                {delivery.status === 'assigned' && (
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Start Task
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Call Customer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}