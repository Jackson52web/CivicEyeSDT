
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import IssueList from './IssueList';
import IssueDetail from './IssueDetail';
import ReportIssueForm from './ReportIssueForm';
import { getIssues, addIssue, upvoteIssue, addCommentToIssue } from '../services/issueService';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const CivicIssueApp = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = () => {
    const fetchedIssues = getIssues();
    setIssues(fetchedIssues);
  };

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setIsDetailOpen(true);
  };

  const handleUpvote = (issueId) => {
    const updatedIssue = upvoteIssue(issueId);
    if (updatedIssue) {
      setIssues(issues.map(issue => 
        issue.id === issueId ? updatedIssue : issue
      ));
      
      if (selectedIssue && selectedIssue.id === issueId) {
        setSelectedIssue(updatedIssue);
      }
      
      toast({
        title: "Upvoted",
        description: "Thank you for supporting this issue!",
      });
    }
  };

  const handleAddComment = (issueId, commentText) => {
    const newComment = addCommentToIssue(issueId, commentText, "Citizen");
    
    if (newComment) {
      // Refresh the issues list
      loadIssues();
      
      // If this is the selected issue, update it
      if (selectedIssue && selectedIssue.id === issueId) {
        const updatedIssue = getIssues().find(issue => issue.id === issueId);
        setSelectedIssue(updatedIssue);
      }
      
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the issue",
      });
    }
  };

  const handleSubmitReport = async (issueData) => {
    try {
      const newIssue = addIssue(issueData);
      setIssues([newIssue, ...issues]);
      return newIssue;
    } catch (error) {
      console.error("Error submitting report:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Civic Issue Reporter</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsReportModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
            <Link to="/admin">
              <Button variant="outline" size="icon">
                <ShieldAlert className="h-4 w-4" />
                <span className="sr-only">Admin Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Help improve your community by reporting and tracking civic issues like potholes, 
          broken streetlights, or garbage accumulation. Your reports help local authorities 
          address problems more quickly.
        </p>
      </header>

      <main>
        <IssueList 
          issues={issues} 
          onIssueSelect={handleIssueSelect} 
          onUpvote={handleUpvote}
        />

        <IssueDetail 
          issue={selectedIssue} 
          open={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
          onUpvote={handleUpvote}
          onAddComment={handleAddComment}
        />

        <ReportIssueForm 
          open={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleSubmitReport}
        />
      </main>
    </div>
  );
};

export default CivicIssueApp;
