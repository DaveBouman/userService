const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passportGoogle from "passport-google-oauth20";
import User from "../entities/database/user";
import passport from "passport";
import UserService from "../services/userService";
const LocalStrategy = require('passport-local');
import crypto from 'crypto';

const userService = new UserService();

passport.use(new LocalStrategy(async function verify(username: string, password: string, cb: Function) {
    const user: User | null = await userService.getUserByName(username);

    if (user == null) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }

    crypto.pbkdf2(password, 'changetosalt', 310000, 32, 'sha256', function (error, hashedPassword) {
        if (error) {
            return cb(error);
        }

        if (!crypto.timingSafeEqual(Buffer.from(user.password), hashedPassword)) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
    });
}));

passport.serializeUser((user: User, done) => {
    done(null, user);
});

passport.deserializeUser((user: User, done) => {
    done(null, user);
});
