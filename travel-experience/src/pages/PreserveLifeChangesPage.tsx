import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface LifeChangesData {
  journeyDescription: string;
  lessonsLearned: string;
  challenges: string;
  feelings: string;
  photos: File[];
}

const PreserveLifeChangesPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LifeChangesData>({
    journeyDescription: '',
    lessonsLearned: '',
    challenges: '',
    feelings: '',
    photos: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof LifeChangesData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call - in a real app, you'd upload the form data and photos
    setTimeout(() => {
      // Store all the form data
      localStorage.setItem('preserveLifeChanges', JSON.stringify({
        ...formData,
        photos: formData.photos.map(photo => ({
          name: photo.name,
          size: photo.size,
          type: photo.type
        }))
      }));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const getImagePreview = (file: File): string => {
    return URL.createObjectURL(file);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-3xl mb-4 text-gray-800">
              Journey Shared Successfully!
            </CardTitle>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for sharing your travel experience. Your journey story will help inspire and guide other travelers.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Share Another Journey
              </Button>
              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    // In a real app, this could navigate to a journey viewing page
                    alert('Feature coming soon: View your shared journey');
                  }}
                >
                  View Your Journey
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center text-gray-800">Preserve Life Changes</CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Share your personal journey and experiences to inspire others
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Journey Description */}
            <div className="space-y-3">
              <Label htmlFor="journeyDescription" className="text-lg font-semibold">
                How was your journey? Describe your life experience
              </Label>
              <Textarea
                id="journeyDescription"
                value={formData.journeyDescription}
                onChange={(e) => handleInputChange('journeyDescription', e.target.value)}
                placeholder="Share the story of your journey - the places you visited, people you met, experiences that changed you, memorable moments, and how this trip impacted your life..."
                className="min-h-[120px] resize-none"
                rows={6}
              />
              <p className="text-sm text-gray-500">
                Tell us about the highlights, unexpected discoveries, and moments that made your journey special.
              </p>
            </div>

            {/* Lessons Learned */}
            <div className="space-y-3">
              <Label htmlFor="lessonsLearned" className="text-lg font-semibold">
                Lessons Learned
              </Label>
              <Textarea
                id="lessonsLearned"
                value={formData.lessonsLearned}
                onChange={(e) => handleInputChange('lessonsLearned', e.target.value)}
                placeholder="What did you learn about yourself, other cultures, life, or travel during this journey? Share the insights and wisdom you gained..."
                className="min-h-[100px] resize-none"
                rows={5}
              />
              <p className="text-sm text-gray-500">
                Reflect on the knowledge, skills, or perspectives you gained from this experience.
              </p>
            </div>

            {/* Challenges and Problems */}
            <div className="space-y-3">
              <Label htmlFor="challenges" className="text-lg font-semibold">
                Challenges or Problems Faced
              </Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => handleInputChange('challenges', e.target.value)}
                placeholder="Describe any difficulties, obstacles, or unexpected problems you encountered during your journey and how you overcame them..."
                className="min-h-[100px] resize-none"
                rows={5}
              />
              <p className="text-sm text-gray-500">
                Share the challenges you faced and how you dealt with them to help future travelers.
              </p>
            </div>

            {/* Feelings and Emotions */}
            <div className="space-y-3">
              <Label htmlFor="feelings" className="text-lg font-semibold">
                How you felt
              </Label>
              <Textarea
                id="feelings"
                value={formData.feelings}
                onChange={(e) => handleInputChange('feelings', e.target.value)}
                placeholder="Express your emotions throughout the journey - excitement, fear, joy, homesickness, wonder, gratitude, or any other feelings you experienced..."
                className="min-h-[100px] resize-none"
                rows={5}
              />
              <p className="text-sm text-gray-500">
                Share the emotional journey alongside the physical one - your feelings before, during, and after the trip.
              </p>
            </div>

            {/* Photo Upload Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                Upload Photos
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-lg font-medium text-gray-600">
                    Click to upload photos
                  </span>
                  <span className="text-sm text-gray-500">
                    Upload multiple photos to share your journey visually
                  </span>
                </label>
              </div>

              {/* Photo Preview Grid */}
              {formData.photos.length > 0 && (
                <div className="space-y-3">
                  <p className="font-medium text-gray-700">
                    Uploaded Photos ({formData.photos.length})
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={getImagePreview(photo)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {photo.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation and Submit */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => navigate('/rate-recommend')}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Journey'
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreserveLifeChangesPage;