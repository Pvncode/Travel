import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleShareJourney = () => {
    navigate('/journey-details');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 leading-relaxed">
          Dusro ki travel journey toh dekh li,<br />
          <span className="text-purple-600">apni nahi banaoge kya?</span>
        </h1>
        
        <Button 
          onClick={handleShareJourney}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Share Your Journey
        </Button>
      </div>
    </div>
  );
};

export default HomePage;