import config from './env'

export const jwtConfig = {
  secret: config.JWT_SECRET,
  accessExpiration: '10m',
  refreshExpiration: '7d',
};