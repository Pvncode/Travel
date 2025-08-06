import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Plus, X } from 'lucide-react';

interface JourneyDetailsData {
  tripType: string;
  from: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  numberOfPeople: string;
  tripWith: string;
  mainTransport: string;
  withinCityTransport: string;
  planningMethod: string;
  websiteAgentName?: string;
  recommendation?: string;
  recommendationReason?: string;
  budget: string;
}

const JourneyDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JourneyDetailsData>({
    tripType: '',
    from: '',
    startDate: '',
    endDate: '',
    destinations: [''],
    numberOfPeople: '',
    tripWith: '',
    mainTransport: '',
    withinCityTransport: '',
    planningMethod: '',
    budget: '',
  });

  const handleInputChange = (field: keyof JourneyDetailsData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addDestination = () => {
    setFormData(prev => ({
      ...prev,
      destinations: [...prev.destinations, '']
    }));
  };

  const removeDestination = (index: number) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.filter((_, i) => i !== index)
    }));
  };

  const updateDestination = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.map((dest, i) => i === index ? value : dest)
    }));
  };

  const handleNext = () => {
    // Store form data in localStorage or context
    localStorage.setItem('journeyDetails', JSON.stringify(formData));
    navigate('/rate-recommend');
  };

  const showWebsiteAgentFields = formData.planningMethod === 'Online Website' || formData.planningMethod === 'Local Agent';
  const showReasonField = formData.recommendation === 'No' || formData.recommendation === 'Never';

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center text-gray-800">Journey Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Trip Type */}
            <div className="space-y-2">
              <Label htmlFor="tripType">Trip Type</Label>
              <Select value={formData.tripType} onValueChange={(value) => handleInputChange('tripType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trip type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Domestic">Domestic</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* From Location and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From (Starting Location)</Label>
                <Input
                  id="from"
                  value={formData.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  placeholder="Enter starting location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>

            {/* Multiple Destinations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Destinations</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDestination}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Destination
                </Button>
              </div>
              {formData.destinations.map((destination, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={destination}
                    onChange={(e) => updateDestination(index, e.target.value)}
                    placeholder={`Destination ${index + 1}`}
                  />
                  {formData.destinations.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeDestination(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Number of People and Trip With */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numberOfPeople">Number of People</Label>
                <Input
                  id="numberOfPeople"
                  type="number"
                  value={formData.numberOfPeople}
                  onChange={(e) => handleInputChange('numberOfPeople', e.target.value)}
                  placeholder="Enter number of people"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tripWith">Trip With</Label>
                <Select value={formData.tripWith} onValueChange={(value) => handleInputChange('tripWith', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select companion type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Friends">Friends</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Transport Modes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainTransport">Main Transport Mode</Label>
                <Select value={formData.mainTransport} onValueChange={(value) => handleInputChange('mainTransport', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select main transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Train">Train</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Bike">Bike</SelectItem>
                    <SelectItem value="Flight">Flight</SelectItem>
                    <SelectItem value="Ship/Boat">Ship/Boat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="withinCityTransport">Within-city Transport Mode</Label>
                <Select value={formData.withinCityTransport} onValueChange={(value) => handleInputChange('withinCityTransport', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="City Bus">City Bus</SelectItem>
                    <SelectItem value="Ola/Uber">Ola/Uber</SelectItem>
                    <SelectItem value="Personal Car">Personal Car</SelectItem>
                    <SelectItem value="Cabs">Cabs</SelectItem>
                    <SelectItem value="Metro">Metro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Planning Method */}
            <div className="space-y-2">
              <Label htmlFor="planningMethod">Planning Method</Label>
              <Select value={formData.planningMethod} onValueChange={(value) => handleInputChange('planningMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select planning method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Self">Self</SelectItem>
                  <SelectItem value="Online Website">Online Website</SelectItem>
                  <SelectItem value="Local Agent">Local Agent</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Website/Agent Details */}
            {showWebsiteAgentFields && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="websiteAgentName">
                    {formData.planningMethod === 'Online Website' ? 'Website Name' : 'Agent Name'}
                  </Label>
                  <Input
                    id="websiteAgentName"
                    value={formData.websiteAgentName || ''}
                    onChange={(e) => handleInputChange('websiteAgentName', e.target.value)}
                    placeholder={`Enter ${formData.planningMethod === 'Online Website' ? 'website' : 'agent'} name`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recommendation">Recommendation</Label>
                  <Select value={formData.recommendation || ''} onValueChange={(value) => handleInputChange('recommendation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recommendation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Highly Recommend">Highly Recommend</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {showReasonField && (
                  <div className="space-y-2">
                    <Label htmlFor="recommendationReason">Reason (Optional)</Label>
                    <Textarea
                      id="recommendationReason"
                      value={formData.recommendationReason || ''}
                      onChange={(e) => handleInputChange('recommendationReason', e.target.value)}
                      placeholder="Enter reason for not recommending"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="Enter total budget"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
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

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JourneyDetailsPage;