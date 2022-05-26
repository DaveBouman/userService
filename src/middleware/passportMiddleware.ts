const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passportGoogle from "passport-google-oauth20";
import User from "../entities/database/user";
import passport from "passport";
import UserService from "../services/userService";
const LocalStrategy = require('passport-local');
import crypto from 'crypto';

const userService = new UserService();

passport.use(new LocalStrategy(async function verify(username: string, password: string, cb: Function) {
    const user: User | null = await userService.getUserByUsername(username);

    if (user == null) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }

    const cryp = crypto.createHmac("sha256", 'changetosalt')
    if (cryp.update(password).digest('hex') == user.password) {
        return cb(null, user);
    }

}));

passport.serializeUser((user: User, done) => {
    done(null, user);
});

passport.deserializeUser((user: User, done) => {
    done(null, user);
});
