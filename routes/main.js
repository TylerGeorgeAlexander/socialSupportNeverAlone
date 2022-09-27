const express = require('express')
const passport = require('passport')

// Router refers to how the server will react to an endpoint request.
const router = express.Router()

const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Login
router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

// Log out
router.get('/logout', authController.logout)

// Sign Up
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

//@desc Auth with Google
//@route GET /auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

//@desc Google auth callback
//@route GET /auth/google/callback
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req,res) => {
    res.redirect('/companies')
})

//@desc Logout User
//@route /auth/logout
//!Change: Passport 0.6 requires logout to be async
router.get('/logout', (req,res,next) => {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('/')
    })
})


module.exports = router