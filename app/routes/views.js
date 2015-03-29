module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/success', function(req, res){
		res.send({state: 'success', user: req.user ? req.user : null});
	  });

	  //sends failure login state back to angular
	app.get('/failure', function(req, res){
		  res.send({state: 'failure', user: null, message: "Invalid username or password"});
	   });
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login for
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/success', // redirect to the secure profile section
        failureRedirect : '/failure', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/success',
        failureRedirect : '/failure', 
        failureFlash : true 
    }));

    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
    //redirect to home page
    res.redirect('/');
}
