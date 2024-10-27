# AgroPlanner Pro

A modern agricultural planning and management system built with Next.js 13, featuring real-time monitoring, crop management, and predictive analytics.

## Features

- 📊 Real-time dashboard with farm analytics
- 🌱 Comprehensive crop management
- 🌤️ Weather integration and forecasting
- 📅 Task planning and scheduling
- 📈 Yield predictions and optimization
- 🔐 Secure authentication system
- 📱 Responsive design for all devices
- 🌙 Dark mode support

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Initialize the database:
   ```bash
   npm run db:setup
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT with jose
- **Form Handling**: react-hook-form + zod
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
├── app/                 # Next.js 13 app directory
│   ├── api/            # API routes
│   ├── (auth)/        # Authentication pages
│   ├── dashboard/     # Dashboard pages
│   └── layout.tsx     # Root layout
├── components/         # Reusable components
├── lib/               # Utility functions
└── public/            # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for any purpose.