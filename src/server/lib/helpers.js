function ensureAuthenticated(req, res, next) {
  if(!req.user) {
    return res.redirect('/login')
  } else {
    next();
  }
  //check if user is authenticated
    //if not -> redirect to login
    //if so -> call next()
}

function loginRedirect(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  } else {
    next();
  }
  //check if user is authenticated
    //if not -> call next()
    //if so -> redirect to main route
}


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  loginRedirect: loginRedirect
}