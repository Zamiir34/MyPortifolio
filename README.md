# MERN Stack Personal Portfolio

A modern, professional, fully responsive personal portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js), Tailwind CSS, Framer Motion, and React Icons.

## Features

### Portfolio
- Hero section with typing animation, CV download, and social links
- About Me with biography, skills summary, and personal info card
- Skills with animated progress bars by category
- Projects with search, filter, and hover effects
- Experience timeline
- Education section
- Services cards
- Client testimonials with ratings
- Contact form (messages stored in MongoDB)
- Dark/Light mode toggle
- Loading screen, scroll animations, animated counters
- Custom 404 page
- SEO optimized with React Helmet

### Admin Dashboard
- JWT authentication (login/logout)
- Dashboard statistics overview
- CRUD for Projects, Skills, Experience, Education, Testimonials
- Contact message management
- Profile settings with image upload
- Resume upload

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | React Icons |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |

## Project Structure

```
portfolio/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── layouts/        # Layout wrappers
│       ├── hooks/          # Custom React hooks
│       ├── services/       # API service layer
│       └── context/        # React context providers
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & upload middleware
│   └── config/             # DB, email, seed config
└── package.json            # Root scripts
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# Install all dependencies
npm run install:all

# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### Seed Database

```bash
npm run seed
```

Default admin credentials:
- **Email:** admin@portfolio.com
- **Password:** admin123

### Run Development

```bash
# Start both client and server
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin/login

### Build for Production

```bash
npm run build
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Admin login |
| GET | /api/auth/profile | No | Public profile |
| PUT | /api/auth/profile | Yes | Update profile |
| GET | /api/projects | No | List projects |
| POST | /api/projects | Yes | Create project |
| GET | /api/skills | No | List skills |
| GET | /api/experiences | No | List experience |
| GET | /api/education | No | List education |
| GET | /api/testimonials | No | List testimonials |
| POST | /api/messages | No | Submit contact form |
| GET | /api/dashboard/stats | Yes | Dashboard stats |

## Deployment

### Backend
Deploy to Render, Railway, or Heroku. Set environment variables from `server/.env.example`.

### Frontend
Deploy to Vercel or Netlify. Set `VITE_API_URL` to your production API URL.

### Database
Use MongoDB Atlas for production. Update `MONGODB_URI` in server environment.

## License

MIT
