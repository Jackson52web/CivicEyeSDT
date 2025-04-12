
import React from 'react';
import { Card } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { formatDistanceToNow } from 'date-fns';
import { 
  ThumbsUp, 
  MessageSquare, 
  MapPin 
} from 'lucide-react';

const IssueCard = ({ issue, onClick, onUpvote }) => {
  const handleUpvote = (e) => {
    e.stopPropagation();
    onUpvote(issue.id);
  };

  return (
    <Card 
      className="civic-card cursor-pointer overflow-hidden mb-4" 
      onClick={() => onClick(issue)}
    >
      <div className="relative">
        {issue.imageUrl && (
          <div className="h-48 overflow-hidden">
            <img 
              src={issue.imageUrl} 
              alt={issue.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <StatusBadge status={issue.status} />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start gap-1 mb-1">
          <div className="text-2xl mr-2">{getIssueIcon(issue.type)}</div>
          <h3 className="text-lg font-semibold">{issue.title}</h3>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{issue.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <MapPin size={12} className="mr-1" />
          <span>{issue.location?.address || "Location unavailable"}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleUpvote}
              className="flex items-center text-gray-600 hover:text-civic-blue transition-colors"
            >
              <ThumbsUp size={14} className="mr-1" />
              <span>{issue.upvotes}</span>
            </button>
            
            <div className="flex items-center text-gray-600">
              <MessageSquare size={14} className="mr-1" />
              <span>{issue.comments?.length || 0}</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </Card>
  );
};

function getIssueIcon(type) {
  switch(type) {
    case "Pothole": return "🚧";
    case "Broken Streetlight": return "💡";
    case "Garbage Accumulation": return "🗑️";
    case "Water Leakage": return "💧";
    case "Damaged Public Property": return "🏛️";
    case "Graffiti": return "🖌️";
    case "Fallen Tree": return "🌳";
    default: return "❓";
  }
}

export default IssueCard;
