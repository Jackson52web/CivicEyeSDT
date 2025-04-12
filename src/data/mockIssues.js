
export const mockIssues = [
  {
    id: 1,
    title: "Large pothole on Main Street",
    description: "There's a large pothole that's causing damage to vehicles",
    location: { lat: 40.7128, lng: -74.0060, address: "123 Main St" },
    imageUrl: "https://images.unsplash.com/photo-1605295616732-1c96215c1c1c",
    type: "Pothole",
    status: "In Progress", 
    createdAt: "2025-04-01T10:30:00Z",
    updatedAt: "2025-04-05T14:20:00Z", 
    upvotes: 15,
    comments: [
      { id: 1, text: "I damaged my tire here last week!", user: "Jane", createdAt: "2025-04-02T08:15:00Z" },
      { id: 2, text: "I saw city workers looking at it yesterday", user: "Mike", createdAt: "2025-04-04T16:45:00Z" }
    ]
  },
  {
    id: 2,
    title: "Streetlight out on Park Avenue",
    description: "The streetlight has been out for a week causing safety issues at night",
    location: { lat: 40.7112, lng: -73.9896, address: "45 Park Ave" },
    imageUrl: "https://images.unsplash.com/photo-1515871204537-49a2daee7a97",
    type: "Broken Streetlight",
    status: "Pending",
    createdAt: "2025-04-03T18:20:00Z",
    updatedAt: "2025-04-03T18:20:00Z",
    upvotes: 8,
    comments: [
      { id: 3, text: "It's very dark and unsafe now", user: "Sarah", createdAt: "2025-04-04T19:30:00Z" }
    ]
  },
  {
    id: 3,
    title: "Overflowing trash bins in Central Park",
    description: "The trash bins near the lake haven't been emptied in days",
    location: { lat: 40.7829, lng: -73.9654, address: "Central Park West" },
    imageUrl: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a",
    type: "Garbage Accumulation",
    status: "Resolved",
    createdAt: "2025-03-25T09:10:00Z",
    updatedAt: "2025-04-02T11:05:00Z",
    upvotes: 23,
    comments: [
      { id: 4, text: "The smell is terrible!", user: "David", createdAt: "2025-03-26T10:15:00Z" },
      { id: 5, text: "Thanks for cleaning it up so quickly", user: "Emily", createdAt: "2025-04-02T14:30:00Z" }
    ]
  }
];
