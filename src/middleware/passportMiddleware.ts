const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passportGoogle from "passport-google-oauth20";
import User from "../entities/database/user";
import passport from "passport";
import UserService from "../services/userService";
const LocalStrategy = require('passport-local');
import crypto from 'crypto';

const userService = new UserService();

passport.use(new GoogleStrategy(
    {
        clientID: "758144089634-teoht7idk1g4sb64mvcl1268h9bapfh3.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://20.240.3.23:3001/api/v1/users/google/auth/callback",
    },
    async function (accessToken: string, refreshToken: string, profile: passportGoogle.Profile, done: any) {

        if (profile == undefined || profile.emails == undefined || profile.emails[0].value == undefined) {
            return;
        }

        const user = await userService.getOneByEmail(profile.emails[0].value);

        if (user == null) {
            createUser(profile);
        }

        await done(null, profile);
    }
));

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

const createUser = async (profile: passportGoogle.Profile) => {

    if (profile == undefined || profile.emails == undefined || profile.emails[0].value == undefined) {
        return;
    }

    const user = new User;

    user.email = profile.emails[0].value;
    user.familyName = profile.name?.familyName ? profile.name?.familyName : "";
    user.name = profile.name?.givenName ? profile.name?.givenName : "";
    user.providerKey = profile.id;
    user.social = profile.provider

    await userService.save(user);

}

passport.serializeUser((user: User, done) => {
    done(null, user);
});

passport.deserializeUser((user: User, done) => {
    done(null, user);
});
