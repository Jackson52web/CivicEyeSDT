
import React, { useState, useEffect } from 'react';
import { Camera, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { issueTypes } from '../data/issueTypes';
import { getCurrentLocation, getAddressFromCoordinates } from '../utils/geoLocation';
import { useToast } from '@/hooks/use-toast';

const ReportIssueForm = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      resetForm();
      getLocation();
    }
  }, [open]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('');
    setImage(null);
    setImagePreview('');
    setLocation(null);
  };

  const getLocation = async () => {
    try {
      setLoadingLocation(true);
      const coords = await getCurrentLocation();
      const address = await getAddressFromCoordinates(coords);
      setLocation({ ...coords, address });
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to get your location. Please try again.",
        variant: "destructive"
      });
      console.error("Error getting location:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !type || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // In a real app, we would upload the image to a server and get a URL back
      // For this demo, we'll use the image preview as a placeholder
      const issueData = {
        title,
        description,
        type,
        location,
        imageUrl: imagePreview || null
      };
      
      await onSubmit(issueData);
      
      toast({
        title: "Issue Reported",
        description: "Your issue has been successfully reported",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report a Civic Issue</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Brief title of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Issue Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map(type => (
                  <SelectItem key={type.id} value={type.name}>
                    <div className="flex items-center">
                      <span className="mr-2">{type.icon}</span>
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Upload Image (Optional)</Label>
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview}
                  alt="Issue preview" 
                  className="w-full h-40 object-cover rounded-md"
                />
                <Button 
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={clearImage}
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md border-gray-300 p-4">
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to add image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Location</Label>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
              {loadingLocation ? (
                <div className="flex items-center text-sm text-gray-500">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  <span>Getting location...</span>
                </div>
              ) : location ? (
                <div className="text-sm">
                  <p className="font-medium">{location.address}</p>
                  <p className="text-gray-500 text-xs">
                    Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                  </p>
                </div>
              ) : (
                <span className="text-sm text-gray-500">Location not available</span>
              )}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={getLocation}
              >
                {loadingLocation ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Get Location"
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitting || loadingLocation}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportIssueForm;
