import express from "express";
const router = express.Router();
import passport from "passport";

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/home' }),
  (req, res) => {
    // Successful authentication, redirect to home.
    res.send('google user logged in');
  }
);
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("logged out");
  });
});


export default router;