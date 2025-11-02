import React from 'react';
import { useApp } from '../context/AppContext';

const Notifications = () => {
  const { messages } = useApp();

  const getMessageIcon = (type) => {
    switch(type) {
      case 'system': return '🔔';
      case 'job-offer': return '💼';
      case 'notification': return '📢';
      default: return '📨';
    }
  };

  const getMessageColor = (type) => {
    switch(type) {
      case 'system': return 'bg-blue-50 border-blue-200';
      case 'job-offer': return 'bg-green-50 border-green-200';
      case 'notification': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-poppins mb-4">Notifications</h1>
          <p className="text-gray-600 text-lg">Stay updated with your job activity and messages.</p>
        </div>

        {messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-2xl font-bold mb-2">No notifications yet</h3>
            <p className="text-gray-600">You'll see updates here when there's activity.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`bg-white rounded-xl shadow-md border-l-4 p-6 hover:shadow-lg transition ${getMessageColor(message.type)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{getMessageIcon(message.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">{message.sender}</span>
                      <span className="text-sm text-gray-500">{formatTime(message.timestamp)}</span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                    {message.receiver !== 'All Users' && (
                      <p className="text-xs text-gray-500 mt-2">To: {message.receiver}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-iilonga-green to-iilonga-blue text-white rounded-xl p-6">
          <h3 className="font-bold text-lg mb-2">📱 Stay Connected</h3>
          <p className="text-sm opacity-90">
            Notifications are updated in real-time. You'll receive alerts for new jobs, 
            accepted offers, counter offers, and system updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
