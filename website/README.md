# 9abel - NextJS Template Marketplace

A modern, fully-featured Next.js 15 application for a template marketplace with authentication, authorization, MongoDB integration, and Redux state management.

## Features

- **Authentication System**
  - Email/Password login and signup
  - OAuth providers (GitHub, Google)
  - Secure password hashing
  - Session management
  
- **Authorization**
  - Role-based access control (user/admin)
  - Protected routes
  
- **Database Integration**
  - MongoDB connection with Mongoose ODM
  - User and product models
  - Efficient connection handling
  
- **State Management**
  - Redux with Redux Toolkit
  - User state management
  - Cart state management
  
- **Payment Processing**
  - Stripe integration
  - Checkout workflow
  - Order tracking
  
- **UI Components**
  - Modern, responsive design
  - Shadcn UI components
  - Dark/light mode support

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: Redux Toolkit
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)
- Stripe account (for payments)
- OAuth credentials (optional, for social login)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/template-hub.git
   cd template-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the variables with your credentials
   ```bash
   cp .env.example .env.local
   ```

4. Seed the templates:
   ```bash
   npm run seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js app router 
│   │   ├── api/     # API routes
│   │   ├── admin/   # Admin pages
│   │   ├── account/ # User account pages
│   │   └── ...      # Other page routes
│   ├── components/  # React components
│   │   ├── ui/      # UI components
│   │   └── ...      # Other components
│   ├── lib/         # Utilities and libraries
│   │   ├── mongodb.ts          # MongoDB connection
│   │   ├── store.ts            # Redux store
│   │   ├── slices/             # Redux slices
│   │   └── providers.tsx       # Context providers
│   ├── models/      # Mongoose models
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Helper functions
├── .env.example     # Example environment variables
└── ...
```

## Deployment

This application can be deployed to Vercel:

```bash
npm run build
vercel --prod
```

## Environment Variables

Required environment variables:

- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: Your application URL
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_PUBLIC_KEY`: Stripe publishable key
- See `.env.example` for full list

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Mongoose](https://mongoosejs.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Stripe](https://stripe.com/)
