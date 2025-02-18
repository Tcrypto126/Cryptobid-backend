import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import mongoose, { Schema, Document } from 'mongoose';
import { PassportStatic } from 'passport';
import { keys } from './key';

// Define the User interface (adjust properties based on your actual User model)
interface User extends Document {
  id: string;
  name: string;
  email: string;
  // ... other properties
}

// Define the JWT payload interface
interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
  // ... other properties you might have in your JWT payload
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other fields as necessary
});

const User = mongoose.model<User>('users', UserSchema);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey,
};

export const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload: JwtPayload, done: (error: any, user?: User | false) => void) => {
      User.findById(jwt_payload.id)
        .then((user: User | null) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err: any) => {
          console.log(err);
          return done(err, false); // Important: Pass the error to done()
        });
    })
  );
};