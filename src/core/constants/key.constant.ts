export const MetadataKey = {
  REDIS: 'redis',
  POSTGRES: 'postgres',
  ELASTICSEARCH: 'elasticsearch',
  MAILER: 'mailer',
  DISCORD: 'discord'
};

export const TokenExpires = {
  accessToken: '15d',
  refreshToken: '30d',
  redisAccessToken: 60 * 60 * 24 * 15,
  redisRefreshToken: 60 * 60 * 24 * 30
};
