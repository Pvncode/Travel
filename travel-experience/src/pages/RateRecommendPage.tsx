import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Plus, X, Star, StarIcon } from 'lucide-react';

interface StayEntry {
  id: string;
  destination: string;
  stayType: string;
  name: string;
  recommendation: string;
  reason?: string;
  rating: number;
}

interface FoodEntry {
  id: string;
  destination: string;
  foodName: string;
  restaurantName: string;
  address?: string;
  recommendation: string;
  rating: number;
}

interface PlaceEntry {
  id: string;
  destination: string;
  placeName: string;
  recommendation: string;
  rating: number;
}

interface ActivityEntry {
  id: string;
  destination: string;
  activityName: string;
  recommendation: string;
  rating: number;
}

interface RateRecommendData {
  stays: StayEntry[];
  food: FoodEntry[];
  places: PlaceEntry[];
  activities: ActivityEntry[];
  missedPlaces: string[];
}

const RateRecommendPage: React.FC = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<string[]>([]);
  const [formData, setFormData] = useState<RateRecommendData>({
    stays: [],
    food: [],
    places: [],
    activities: [],
    missedPlaces: ['']
  });

  useEffect(() => {
    // Load destinations from journey details
    const journeyDetails = localStorage.getItem('journeyDetails');
    if (journeyDetails) {
      const parsed = JSON.parse(journeyDetails);
      setDestinations(parsed.destinations.filter((dest: string) => dest.trim() !== ''));
    }
  }, []);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Rating component
  const RatingInput: React.FC<{ rating: number; onChange: (rating: number) => void }> = ({ rating, onChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    );
  };

  // Stay management functions
  const addStay = () => {
    setFormData(prev => ({
      ...prev,
      stays: [...prev.stays, {
        id: generateId(),
        destination: destinations[0] || '',
        stayType: '',
        name: '',
        recommendation: '',
        rating: 0
      }]
    }));
  };

  const removeStay = (id: string) => {
    setFormData(prev => ({
      ...prev,
      stays: prev.stays.filter(stay => stay.id !== id)
    }));
  };

  const updateStay = (id: string, field: keyof StayEntry, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      stays: prev.stays.map(stay => stay.id === id ? { ...stay, [field]: value } : stay)
    }));
  };

  // Food management functions
  const addFood = () => {
    setFormData(prev => ({
      ...prev,
      food: [...prev.food, {
        id: generateId(),
        destination: destinations[0] || '',
        foodName: '',
        restaurantName: '',
        recommendation: '',
        rating: 0
      }]
    }));
  };

  const removeFood = (id: string) => {
    setFormData(prev => ({
      ...prev,
      food: prev.food.filter(food => food.id !== id)
    }));
  };

  const updateFood = (id: string, field: keyof FoodEntry, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      food: prev.food.map(food => food.id === id ? { ...food, [field]: value } : food)
    }));
  };

  // Place management functions
  const addPlace = () => {
    setFormData(prev => ({
      ...prev,
      places: [...prev.places, {
        id: generateId(),
        destination: destinations[0] || '',
        placeName: '',
        recommendation: '',
        rating: 0
      }]
    }));
  };

  const removePlace = (id: string) => {
    setFormData(prev => ({
      ...prev,
      places: prev.places.filter(place => place.id !== id)
    }));
  };

  const updatePlace = (id: string, field: keyof PlaceEntry, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      places: prev.places.map(place => place.id === id ? { ...place, [field]: value } : place)
    }));
  };

  // Activity management functions
  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, {
        id: generateId(),
        destination: destinations[0] || '',
        activityName: '',
        recommendation: '',
        rating: 0
      }]
    }));
  };

  const removeActivity = (id: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== id)
    }));
  };

  const updateActivity = (id: string, field: keyof ActivityEntry, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.map(activity => activity.id === id ? { ...activity, [field]: value } : activity)
    }));
  };

  // Missed places management
  const addMissedPlace = () => {
    setFormData(prev => ({
      ...prev,
      missedPlaces: [...prev.missedPlaces, '']
    }));
  };

  const removeMissedPlace = (index: number) => {
    setFormData(prev => ({
      ...prev,
      missedPlaces: prev.missedPlaces.filter((_, i) => i !== index)
    }));
  };

  const updateMissedPlace = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      missedPlaces: prev.missedPlaces.map((place, i) => i === index ? value : place)
    }));
  };

  const handleNext = () => {
    localStorage.setItem('rateRecommend', JSON.stringify(formData));
    navigate('/preserve-life-changes');
  };

  const recommendationOptions = [
    'Highly Recommend',
    'Yes',
    'Neutral',
    'No',
    'Never'
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center text-gray-800">Rate & Recommend</CardTitle>
          </CardHeader>
        </Card>

        {/* Stays Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Stays</CardTitle>
              <Button onClick={addStay} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Stay
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.stays.map((stay) => (
              <div key={stay.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Stay Entry</h3>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeStay(stay.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Select value={stay.destination} onValueChange={(value) => updateStay(stay.id, 'destination', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.map((dest) => (
                          <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Stay Type</Label>
                    <Select value={stay.stayType} onValueChange={(value) => updateStay(stay.id, 'stayType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stay type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hotel">Hotel</SelectItem>
                        <SelectItem value="Hostel">Hostel</SelectItem>
                        <SelectItem value="Airbnb">Airbnb</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={stay.name}
                      onChange={(e) => updateStay(stay.id, 'name', e.target.value)}
                      placeholder="Stay name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Recommendation</Label>
                    <Select value={stay.recommendation} onValueChange={(value) => updateStay(stay.id, 'recommendation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recommendation" />
                      </SelectTrigger>
                      <SelectContent>
                        {recommendationOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <RatingInput
                      rating={stay.rating}
                      onChange={(rating) => updateStay(stay.id, 'rating', rating)}
                    />
                  </div>
                </div>
                
                {(stay.recommendation === 'No' || stay.recommendation === 'Never') && (
                  <div className="space-y-2">
                    <Label>Reason (Optional)</Label>
                    <Textarea
                      value={stay.reason || ''}
                      onChange={(e) => updateStay(stay.id, 'reason', e.target.value)}
                      placeholder="Reason for not recommending"
                      rows={2}
                    />
                  </div>
                )}
              </div>
            ))}
            
            {formData.stays.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No stays added yet. Click "Add Stay" to get started.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Food Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Food</CardTitle>
              <Button onClick={addFood} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Food
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.food.map((food) => (
              <div key={food.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Food Entry</h3>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFood(food.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Select value={food.destination} onValueChange={(value) => updateFood(food.id, 'destination', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.map((dest) => (
                          <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Food Name</Label>
                    <Input
                      value={food.foodName}
                      onChange={(e) => updateFood(food.id, 'foodName', e.target.value)}
                      placeholder="Name of the food"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hotel/Restaurant Name</Label>
                    <Input
                      value={food.restaurantName}
                      onChange={(e) => updateFood(food.id, 'restaurantName', e.target.value)}
                      placeholder="Restaurant or hotel name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Address (Optional)</Label>
                    <Input
                      value={food.address || ''}
                      onChange={(e) => updateFood(food.id, 'address', e.target.value)}
                      placeholder="Restaurant address"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Recommendation</Label>
                    <Select value={food.recommendation} onValueChange={(value) => updateFood(food.id, 'recommendation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recommendation" />
                      </SelectTrigger>
                      <SelectContent>
                        {recommendationOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <RatingInput
                      rating={food.rating}
                      onChange={(rating) => updateFood(food.id, 'rating', rating)}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {formData.food.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No food entries added yet. Click "Add Food" to get started.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Places Visited Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Places Visited</CardTitle>
              <Button onClick={addPlace} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Place
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.places.map((place) => (
              <div key={place.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Place Entry</h3>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removePlace(place.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Select value={place.destination} onValueChange={(value) => updatePlace(place.id, 'destination', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.map((dest) => (
                          <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Place Name</Label>
                    <Input
                      value={place.placeName}
                      onChange={(e) => updatePlace(place.id, 'placeName', e.target.value)}
                      placeholder="Name of the place"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Recommendation</Label>
                    <Select value={place.recommendation} onValueChange={(value) => updatePlace(place.id, 'recommendation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recommendation" />
                      </SelectTrigger>
                      <SelectContent>
                        {recommendationOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <RatingInput
                    rating={place.rating}
                    onChange={(rating) => updatePlace(place.id, 'rating', rating)}
                  />
                </div>
              </div>
            ))}
            
            {formData.places.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No places added yet. Click "Add Place" to get started.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activities Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Activities</CardTitle>
              <Button onClick={addActivity} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.activities.map((activity) => (
              <div key={activity.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Activity Entry</h3>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeActivity(activity.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Select value={activity.destination} onValueChange={(value) => updateActivity(activity.id, 'destination', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.map((dest) => (
                          <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Activity Name</Label>
                    <Input
                      value={activity.activityName}
                      onChange={(e) => updateActivity(activity.id, 'activityName', e.target.value)}
                      placeholder="Name of the activity"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Recommendation</Label>
                    <Select value={activity.recommendation} onValueChange={(value) => updateActivity(activity.id, 'recommendation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recommendation" />
                      </SelectTrigger>
                      <SelectContent>
                        {recommendationOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <RatingInput
                    rating={activity.rating}
                    onChange={(rating) => updateActivity(activity.id, 'rating', rating)}
                  />
                </div>
              </div>
            ))}
            
            {formData.activities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No activities added yet. Click "Add Activity" to get started.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Places Missed Out Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Places Missed Out</CardTitle>
              <Button onClick={addMissedPlace} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Missed Place
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.missedPlaces.map((place, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={place}
                  onChange={(e) => updateMissedPlace(index, e.target.value)}
                  placeholder={`Missed place ${index + 1}`}
                />
                {formData.missedPlaces.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeMissedPlace(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {/* Display missed places as chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.missedPlaces
                .filter(place => place.trim() !== '')
                .map((place, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                  >
                    {place}
                  </span>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between pb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/journey-details')}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RateRecommendPage;