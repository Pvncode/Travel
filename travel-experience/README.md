# Travel Experience Sharing Website

A beautiful React application built with shadcn/ui components that allows travelers to share their journey experiences, recommendations, and life-changing moments.

## Features

### 🏠 **Home Page**
- Engaging Hindi title: "Dusro ki travel journey toh dekh li, apni nahi banaoge kya?"
- Beautiful gradient background with light pastel colors
- Call-to-action button to start sharing journey

### 📝 **Journey Details Page**
- **Trip Type**: Domestic/International selection
- **Travel Information**: Starting location, start and end dates
- **Multiple Destinations**: Dynamic destination management
- **Travel Companions**: Number of people and trip type (Solo/Family/Friends)
- **Transportation**: Main transport and within-city transport options
- **Planning Method**: Self-planned, online websites, local agents with conditional fields
- **Budget**: Travel budget input

### ⭐ **Rate & Recommend Page**
- **Per-destination entries** for comprehensive reviews:
  - **Stays**: Hotel/Hostel/Airbnb with ratings and recommendations
  - **Food**: Restaurant details with ratings and optional addresses
  - **Places Visited**: Tourist spots with ratings and recommendations
  - **Activities**: Travel activities with ratings
  - **Places Missed**: Chip-style display of places you couldn't visit
- **Interactive star ratings** (0-5 stars)
- **Conditional fields** for negative recommendations

### 💭 **Preserve Life Changes Page**
- **Journey Description**: Large text area for life experience sharing
- **Lessons Learned**: Insights and wisdom gained
- **Challenges Faced**: Problems encountered and solutions
- **Emotional Journey**: Feelings and emotions throughout the trip
- **Photo Upload**: Multiple image upload with preview grid
- **Success Page**: Beautiful confirmation with next steps

## Technology Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **shadcn/ui** components for consistent UI
- **Radix UI** primitives for accessibility
- **Lucide React** for icons
- **Class Variance Authority** for component variants

## Design Features

- **Light Pastel Background**: Gradient from purple-50 via pink-50 to blue-50
- **Responsive Design**: Mobile-first approach with responsive grids
- **Modern UI**: Clean cards, proper spacing, and intuitive navigation
- **Interactive Elements**: Star ratings, dynamic form fields, photo previews
- **Smooth Transitions**: Hover effects and loading states

## Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd travel-experience

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── HomePage.tsx
│   ├── JourneyDetailsPage.tsx
│   ├── RateRecommendPage.tsx
│   └── PreserveLifeChangesPage.tsx
├── App.tsx
└── index.css            # Tailwind CSS with custom variables
```

## Key Features Implementation

### Dynamic Form Management
- Add/remove destinations dynamically
- Conditional form fields based on selections
- State persistence using localStorage

### Rating System
- Interactive 5-star rating component
- Visual feedback with filled/unfilled stars
- Rating display with numeric value

### Photo Upload
- Multiple file selection
- Image preview grid
- File removal functionality
- Responsive grid layout

### Navigation Flow
- Linear progression through form steps
- Back/Next navigation between pages
- Form data persistence across pages
- Success confirmation page

## Future Enhancements

- Backend API integration for data persistence
- User authentication and profiles
- Journey sharing and discovery features
- Social features (likes, comments, sharing)
- Advanced search and filtering
- Photo optimization and cloud storage
- Mobile app version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
