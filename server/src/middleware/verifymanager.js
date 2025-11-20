export const VerifyManager = (req, res, next) => {
    if (req.user && req.user.role === 'manager') {
        next(); // Manager is allowed
    } else {
        res.status(403).send({ error: 'Forbidden: Requires manager role.' });
    }
};