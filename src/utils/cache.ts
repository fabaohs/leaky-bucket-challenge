import { PREFIX_CACHE_KEY } from "./constants";

const mountUserTokenKey = (userId: string) => {
  return `${PREFIX_CACHE_KEY}:${userId}:TOKENS`;
};

export default { mountUserTokenKey };
