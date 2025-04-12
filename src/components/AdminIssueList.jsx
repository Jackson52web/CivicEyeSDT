
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';
import { 
  ArrowDown, 
  ArrowUp,
  MessageSquare, 
  Send
} from 'lucide-react';

const AdminIssueList = ({ issues, onStatusChange, onAddComment }) => {
  const [expandedIssue, setExpandedIssue] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedIssues = [...issues].sort((a, b) => {
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortField === 'upvotes') {
      return sortDirection === 'asc' 
        ? a.upvotes - b.upvotes 
        : b.upvotes - a.upvotes;
    }
    
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleExpand = (issueId) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId);
    setCommentText('');
  };

  const handleAddComment = () => {
    if (commentText.trim() && expandedIssue) {
      onAddComment(expandedIssue, commentText);
      setCommentText('');
    }
  };

  const SortArrow = ({ field }) => (
    <span className="ml-1">
      {sortField === field ? (
        sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
      ) : null}
    </span>
  );

  return (
    <div className="overflow-hidden border rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('title')}
            >
              Issue <SortArrow field="title" />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('type')}
            >
              Type <SortArrow field="type" />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('createdAt')}
            >
              Reported <SortArrow field="createdAt" />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('upvotes')}
            >
              Upvotes <SortArrow field="upvotes" />
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedIssues.map(issue => (
            <React.Fragment key={issue.id}>
              <TableRow className={expandedIssue === issue.id ? "bg-gray-50" : ""}>
                <TableCell className="font-medium">{issue.title}</TableCell>
                <TableCell>{issue.type}</TableCell>
                <TableCell>{format(new Date(issue.createdAt), 'MMM d, yyyy')}</TableCell>
                <TableCell>{issue.upvotes}</TableCell>
                <TableCell><StatusBadge status={issue.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleExpand(issue.id)}
                    >
                      {expandedIssue === issue.id ? "Hide" : "Manage"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {expandedIssue === issue.id && (
                <TableRow className="bg-gray-50">
                  <TableCell colSpan={6} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{issue.title}</h3>
                        <p className="text-gray-700 mb-4">{issue.description}</p>
                        
                        {issue.imageUrl && (
                          <div className="mt-2 mb-4">
                            <img 
                              src={issue.imageUrl} 
                              alt={issue.title} 
                              className="rounded-md max-h-48 w-auto object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="text-sm text-gray-600 mb-2">
                          Location: {issue.location.address}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Update Status</h4>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant={issue.status === 'Pending' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => onStatusChange(issue.id, 'Pending')}
                            >
                              Pending
                            </Button>
                            <Button
                              variant={issue.status === 'In Progress' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => onStatusChange(issue.id, 'In Progress')}
                            >
                              In Progress
                            </Button>
                            <Button
                              variant={issue.status === 'Resolved' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => onStatusChange(issue.id, 'Resolved')}
                            >
                              Resolved
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <MessageSquare size={16} className="mr-1" />
                            Comments ({issue.comments.length})
                          </h4>
                          
                          <div className="border rounded-md p-2 bg-white max-h-48 overflow-y-auto mb-2">
                            {issue.comments.length > 0 ? (
                              issue.comments.map(comment => (
                                <div 
                                  key={comment.id} 
                                  className="mb-2 pb-2 border-b last:border-0 last:mb-0 last:pb-0"
                                >
                                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span className="font-medium">{comment.user}</span>
                                    <span>{format(new Date(comment.createdAt), 'MMM d, h:mm a')}</span>
                                  </div>
                                  <p className="text-sm">{comment.text}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500 p-2 text-center">No comments yet</p>
                            )}
                          </div>
                          
                          <div className="flex gap-2 mt-2">
                            <Textarea
                              placeholder="Add admin comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className="text-sm min-h-[80px] flex-1"
                            />
                            <Button 
                              onClick={handleAddComment} 
                              disabled={!commentText.trim()}
                              size="icon"
                              className="self-end"
                            >
                              <Send size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminIssueList;
