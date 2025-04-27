# SoloSphere

SoloSphere is an all-in-one freelancer management application designed to help freelancers and sole traders efficiently manage their business operations.

## Features

- **Project & Task Management**: Track projects, manage tasks, and visualize progress
- **Time Tracking**: Monitor billable hours with a one-click timer
- **Client Management**: Centralized client database with communication history
- **Invoicing**: Generate professional invoices based on tracked time
- **Financial Insights**: Track payments, expenses, and generate reports
- **AI Assistant**: Intelligent assistance for administrative tasks and business insights

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes, Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel

This modern tech stack offers several advantages over the previous approach:
- **Simplified Architecture**: Unified codebase instead of separate client/server
- **Improved Performance**: Server-side rendering and edge computing capabilities
- **Enhanced Security**: Row-level security built into the database layer
- **Easier Deployment**: Simplified CI/CD with Vercel integration
- **Better Developer Experience**: Improved TypeScript integration and DX
- **Reduced Operational Costs**: Serverless architecture with predictable scaling

## Project Structure

```
soloSphere/
├── public/                # Static files
├── src/                   # Source code
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   ├── (auth)/        # Authentication routes
│   │   ├── dashboard/     # Dashboard and app pages
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   │   ├── supabase.ts    # Supabase client
│   │   └── auth.ts        # Authentication utilities
│   ├── services/          # Service layer
│   └── types/             # TypeScript type definitions
├── .env.local             # Environment variables (gitignored)
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Supabase account (for database and authentication)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/soloSphere.git
   cd soloSphere
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   ```
   cp .env.example .env.local
   ```
   Then update the `.env.local` file with your Supabase URL and anon key.

4. Start the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Setting up Supabase

1. Create a new project in Supabase
2. Set up authentication providers
3. Run the database setup SQL scripts (available in the `/supabase` directory)
4. Add your Supabase URL and anon key to your `.env.local` file

### Running in Production

1. Build the application
   ```
   npm run build
   ```

2. Start the production server
   ```
   npm start
   ```

3. For optimal performance, deploy to Vercel:
   ```
   vercel deploy
   ```

## Development Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run the linter
- `npm run test`: Run tests

## AI-Enhanced Features

SoloSphere integrates AI capabilities to enhance the freelancer experience:

- **Smart Assistant**: AI-powered chat interface for answering questions and performing tasks
- **Invoicing**: AI-suggested line items based on project history, AI-generated payment reminder emails
- **Expense Tracking**: AI auto-categorization of expenses, smart anomaly detection for unusual expenses
- **Financial Dashboard**: AI-generated smart tips (e.g., expense spikes, cashflow warnings)
- **Client Insights**: AI analysis of client communication patterns and relationship health
- **Time Optimization**: AI suggestions for improving productivity based on work patterns

These AI features help reduce administrative overhead, provide valuable business insights, and ensure nothing falls through the cracks.

## Documentation

For more detailed information about SoloSphere, please refer to the following documentation:

- [Comprehensive Development Plan](./SoloSphere_Comprehensive_Plan.md)
- [AI Assistant User Stories](./SoloSphere_AI_Assistant_User_Stories.md)
- [Feature Priorities](./SoloSphere_Feature_Priorities.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.