exports.isAdmin = (req, res, next) => {
if (req.session.user?.role === 'admin') return next();
res.status(403).send('Acesso negado');
};

exports.isSupermarket = (req, res, next) => {
if (req.session.user?.role === 'supermarket') return next();
res.status(403).send('Acesso negado');
};