
import React from 'react';
import IssueCard from './IssueCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IssueList = ({ issues, onIssueSelect, onUpvote }) => {
  const filterByStatus = (status) => {
    if (status === 'all') return issues;
    return issues.filter(issue => issue.status === status);
  };
  
  return (
    <div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="Pending">Pending</TabsTrigger>
          <TabsTrigger value="In Progress">In Progress</TabsTrigger>
          <TabsTrigger value="Resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {issues.length > 0 ? (
            issues.map(issue => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onClick={onIssueSelect} 
                onUpvote={onUpvote}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 my-10">No issues reported yet</p>
          )}
        </TabsContent>
        
        <TabsContent value="Pending">
          {filterByStatus('Pending').length > 0 ? (
            filterByStatus('Pending').map(issue => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onClick={onIssueSelect} 
                onUpvote={onUpvote}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 my-10">No pending issues</p>
          )}
        </TabsContent>
        
        <TabsContent value="In Progress">
          {filterByStatus('In Progress').length > 0 ? (
            filterByStatus('In Progress').map(issue => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onClick={onIssueSelect} 
                onUpvote={onUpvote}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 my-10">No issues in progress</p>
          )}
        </TabsContent>
        
        <TabsContent value="Resolved">
          {filterByStatus('Resolved').length > 0 ? (
            filterByStatus('Resolved').map(issue => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onClick={onIssueSelect} 
                onUpvote={onUpvote}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 my-10">No resolved issues</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IssueList;
