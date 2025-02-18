import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import { passportConfig } from "./config/passport";
import path from "path";
import userRouter from "./routes/api/UserRoutes";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to database
import "./config/db";

const app = express();

// CORS should come before other middleware to handle preflight requests correctly
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Session configuration (before Passport!)
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', // Use environment variable!
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    httpOnly: true // Recommended for security
  }
}));

// Passport configuration and initialization
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session()); // Connect Passport to the session

// API routes
app.use('/api/user', userRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Server created successfully!');
});

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));