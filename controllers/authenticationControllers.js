const User = require('../models/user');

exports.getRegister = (req, res) => res.render('auth/register', { error: null });

exports.postRegister = async (req, res) => {
  try {
    const { username, email, password, phone, address, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.render('auth/register', { error: 'Email já registado' });
    await User.create({ username, email, password, phone, address, role: role || 'client' });
    res.redirect('/auth/login');
  } catch (err) {
    res.render('auth/register', { error: 'Error while registring' });
  }
};

exports.getLogin = (req, res) => res.render('auth/login', { error: null });

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    req.session.user = {
      _id: user._id, username: user.username, role: user.role, email: user.email};

    return res.json({user: { role: user.role, username: user.username }});

  } catch (err) {
    return res.json({ error: { msg: 'Invalid credentials' } });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};