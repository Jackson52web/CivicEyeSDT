
import React, { useState, useEffect } from 'react';
import { getIssues, updateIssueStatus, addCommentToIssue } from '../services/issueService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AdminIssueList from '../components/AdminIssueList';

const Admin = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const { toast } = useToast();
  
  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = () => {
    const fetchedIssues = getIssues();
    setIssues(fetchedIssues);
  };

  const handleStatusChange = (issueId, newStatus) => {
    try {
      const updatedIssue = updateIssueStatus(issueId, newStatus);
      if (updatedIssue) {
        setIssues(issues.map(issue => 
          issue.id === issueId ? updatedIssue : issue
        ));
        
        toast({
          title: "Status Updated",
          description: `Issue status changed to ${newStatus}`,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update issue status.",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = (issueId, commentText) => {
    const newComment = addCommentToIssue(issueId, commentText, "Admin");
    
    if (newComment) {
      // Refresh the issues list
      loadIssues();
      
      toast({
        title: "Comment Added",
        description: "Your admin comment has been added to the issue",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Back to Public View
          </Button>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Manage civic issues, update statuses, and respond to community reports.
        </p>
      </header>

      <main>
        <AdminIssueList 
          issues={issues} 
          onStatusChange={handleStatusChange} 
          onAddComment={handleAddComment}
        />
      </main>
    </div>
  );
};

export default Admin;
