const User = require('../models/user');

exports.getRegister = (req, res) => res.render('auth/register', { error: null });

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.render('auth/register', { error: 'Email já registado' });
    await User.create({ name, email, password, phone, address, role: role || 'client' });
    res.redirect('/auth/login');
  } catch (err) {
    res.render('auth/register', { error: 'Erro ao registar' });
  }
};

exports.getLogin = (req, res) => res.render('auth/login', { error: null });

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.render('auth/login', { error: 'Credenciais inválidas' });
    req.session.user = { _id: user._id, name: user.name, role: user.role, email: user.email };
    res.redirect('/');
  } catch (err) {
    res.render('auth/login', { error: 'Erro ao fazer login' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};