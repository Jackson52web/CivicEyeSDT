
import React from 'react';
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <span className={cn(
      'px-2 py-1 rounded-full text-xs font-medium border', 
      getStatusClass()
    )}>
      {status}
    </span>
  );
};

export default StatusBadge;
