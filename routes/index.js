
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'SleepLog' })
};

exports.login = function(req, res){
  res.render('login', { title: 'SleepLog',
                        userName: req.body.user,
                        password: req.body.pwd });
};