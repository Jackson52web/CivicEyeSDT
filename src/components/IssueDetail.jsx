
import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import StatusBadge from './StatusBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ThumbsUp, MapPin, MessageSquare, Calendar, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const IssueDetail = ({ issue, open, onClose, onUpvote, onAddComment }) => {
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);
  const commentSectionRef = useRef(null);

  if (!issue) return null;

  const handleUpvote = () => {
    onUpvote(issue.id);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(issue.id, comment);
      setComment('');
    }
  };

  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-2 sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl">{getIssueIcon(issue.type)}</div>
              <DialogTitle className="text-xl">{issue.title}</DialogTitle>
            </div>
            <StatusBadge status={issue.status} />
          </div>
        </DialogHeader>

        {issue.imageUrl && (
          <div className="relative h-64 w-full">
            <img 
              src={issue.imageUrl} 
              alt={issue.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4">
          <div className="flex flex-col space-y-4">
            <p>{issue.description}</p>

            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{issue.location.address}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>Reported {format(new Date(issue.createdAt), 'PPP')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleUpvote}
              >
                <ThumbsUp size={14} />
                <span>Upvote ({issue.upvotes})</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={scrollToComments}
              >
                <MessageSquare size={14} />
                <span>Comment ({issue.comments.length})</span>
              </Button>
            </div>

            <Separator />

            <div ref={commentSectionRef}>
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <MessageSquare size={16} />
                <span>Comments ({issue.comments.length})</span>
              </h4>

              <ScrollArea className="h-[180px] rounded-md border p-2">
                {issue.comments.length > 0 ? (
                  <div className="space-y-4">
                    {issue.comments.map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-medium ${comment.user === 'Admin' ? 'text-blue-600' : ''}`}>
                            {comment.user}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(comment.createdAt), 'PP')}
                          </span>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No comments yet</p>
                )}
              </ScrollArea>

              <form onSubmit={handleAddComment} className="flex gap-2 mt-3">
                <Input
                  ref={commentInputRef}
                  placeholder="Add a comment as citizen..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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

export default IssueDetail;
