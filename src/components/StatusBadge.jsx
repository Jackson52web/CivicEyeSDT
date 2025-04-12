
import React from 'react';
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'In Progress':
        return 'status-in-progress';
      case 'Resolved':
        return 'status-resolved';
      default:
        return 'bg-gray-100 text-gray-800';
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
