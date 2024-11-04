export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRE,
};

export const jwtFiveMConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '5m',
};
