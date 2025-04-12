
import { mockIssues } from "../data/mockIssues";
import { issueTypes } from "../data/issueTypes";

let issues = [...mockIssues];
let nextId = issues.length + 1;
let nextCommentId = 6;

export const getIssues = () => {
  return [...issues];
};

export const getIssueById = (id) => {
  return issues.find(issue => issue.id === parseInt(id));
};

export const getIssueTypes = () => {
  return [...issueTypes];
};

export const addIssue = (issueData) => {
  const newIssue = {
    id: nextId++,
    ...issueData,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upvotes: 0,
    comments: []
  };
  
  issues = [newIssue, ...issues];
  return newIssue;
};

export const upvoteIssue = (id) => {
  const issueIndex = issues.findIndex(issue => issue.id === parseInt(id));
  
  if (issueIndex !== -1) {
    issues[issueIndex] = {
      ...issues[issueIndex],
      upvotes: issues[issueIndex].upvotes + 1,
      updatedAt: new Date().toISOString()
    };
    return issues[issueIndex];
  }
  
  return null;
};

export const addCommentToIssue = (id, commentText, user = "Anonymous") => {
  const issueIndex = issues.findIndex(issue => issue.id === parseInt(id));
  
  if (issueIndex !== -1) {
    const newComment = {
      id: nextCommentId++,
      text: commentText,
      user,
      createdAt: new Date().toISOString()
    };
    
    issues[issueIndex] = {
      ...issues[issueIndex],
      comments: [...issues[issueIndex].comments, newComment],
      updatedAt: new Date().toISOString()
    };
    
    return newComment;
  }
  
  return null;
};

export const updateIssueStatus = (id, status) => {
  const validStatuses = ["Pending", "In Progress", "Resolved"];
  
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }
  
  const issueIndex = issues.findIndex(issue => issue.id === parseInt(id));
  
  if (issueIndex !== -1) {
    issues[issueIndex] = {
      ...issues[issueIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    return issues[issueIndex];
  }
  
  return null;
};
