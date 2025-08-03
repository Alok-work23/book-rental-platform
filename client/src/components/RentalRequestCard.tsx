import React from 'react';
import { Calendar, User, IndianRupee, Clock, CheckCircle, XCircle } from 'lucide-react';
import { RentalRequest } from '../contexts/BookContext';
import { useBooks } from '../contexts/BookContext';

interface RentalRequestCardProps {
  request: RentalRequest;
}

export default function RentalRequestCard({ request }: RentalRequestCardProps) {
  const { updateRentalStatus } = useBooks();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-blue-100 text-blue-800 border-blue-200',
    'picked-up': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    returned: 'bg-purple-100 text-purple-800 border-purple-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
  };

  const handleApprove = () => {
    updateRentalStatus(request.id, 'approved');
  };

  const handleReject = () => {
    // In a real app, you'd probably want a confirmation dialog
    if (confirm('Are you sure you want to reject this rental request?')) {
      // Remove the request (in a real app, you'd update status to 'rejected')
      // For now, we'll just not show it
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.bookTitle}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{request.renterName}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{request.startDate} to {request.endDate}</span>
            </div>
            <div className="flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              <span>{request.totalPrice}</span>
            </div>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[request.status]}`}>
          {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mb-4">
        <div className="flex items-center space-x-4 text-xs">
          {['pending', 'approved', 'picked-up', 'delivered', 'returned', 'completed'].map((status, index) => {
            const isActive = ['pending', 'approved', 'picked-up', 'delivered', 'returned', 'completed'].indexOf(request.status) >= index;
            return (
              <div key={status} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                {index < 5 && (
                  <div className={`w-8 h-0.5 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Requested</span>
          <span>Approved</span>
          <span>Picked up</span>
          <span>Delivered</span>
          <span>Returned</span>
          <span>Completed</span>
        </div>
      </div>

      {/* Actions */}
      {request.status === 'pending' && (
        <div className="flex space-x-3">
          <button
            onClick={handleReject}
            className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            <span>Reject</span>
          </button>
          <button
            onClick={handleApprove}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Approve</span>
          </button>
        </div>
      )}

      {request.status === 'approved' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Waiting for pickup</span>
          </div>
          <p className="text-sm text-blue-800">
            A delivery partner will contact you within 24 hours to schedule pickup.
          </p>
        </div>
      )}

      {(request.status === 'picked-up' || request.status === 'delivered') && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">
              {request.status === 'picked-up' ? 'Book picked up' : 'Book delivered'}
            </span>
          </div>
          <p className="text-sm text-green-800">
            {request.status === 'picked-up' 
              ? 'Your book is on its way to the renter.'
              : 'Your book has been delivered to the renter.'
            }
          </p>
        </div>
      )}
    </div>
  );
}