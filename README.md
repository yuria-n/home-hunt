# Home Hunt

Website: https://home-hunt-kappa.vercel.app/

This is a rental search service designed to handle large datasets, offering interactive content and analytical features through a map-based interface. This project is a mock web application utilizing dummy data to demonstrate the functionalities of a modern rental search platform.

The application is built with Next.js, React, and Tailwind CSS.

## Setup Instructions

### App

The main application code is located in the `src/app/` directory.

1. To install the necessary dependencies, run: `npm ci`
2. Start the development server with: `npm run dev`
3. Open your browser and navigate to http://localhost:3000 to view the application

### Gulp

Dummy data in JSON format is generated using Gulp tasks.

1. Pass the number of rows you want to create after the command:`npm run gulp map:housing:generate -- -c 500`

## Technologies Used

- Vercel
- Next.js
- TypeScript
- React
- Leaflet
- Recharts
- Tailwind
