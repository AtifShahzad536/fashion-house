import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_bridal_luxury_jwt_key_2026_atelier', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export default generateToken;
