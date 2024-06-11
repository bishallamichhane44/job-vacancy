const User = require("../Models/User");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { userAuth } = require("../Middlewares/userAuth");
const { JWT_SECRET } = require("../config");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtPassport = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      try {
        const user = await User.findById(payload.user_id);
        if (user) {
          //we can implement our logger function here to keep track
          //of every logs using pakages like morgan or winston

          return done(null, user); //appends the user to the req obj
        }
        //logger function
        return done(null, false);
      } catch (err) {
        return done(null, err);
      }
    })
  );
};

const serializeUser = (user) => {
  return {
    role: user.role,
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    avatar: user.avatar,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  jwtPassport,
  serializeUser,
};
