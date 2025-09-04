import cacheService from "./cache-service";
import cacheUtils from "../utils/cache";

const consumeToken = async (userId: string) => {
  const key = cacheUtils.mountUserTokenKey(userId);
  const tokens = await cacheService.getCacheValue<number>(key);

  if (!tokens || tokens <= 0) {
    return;
  }

  return await cacheService.decreaseTokens(key);
};

export default {
  consumeToken,
};
