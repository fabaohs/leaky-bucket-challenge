import cache from "../configs/cache";

const deleteCacheValue = async (key: string) => {
  try {
    await cache.del(key);
  } catch (e) {
    throw new Error(
      `Failed to delete cache value for key "${key}": ${e.message}`
    );
  }
};

const increaseTokens = async (key: string) => {
  try {
    return await cache.incr(key);
  } catch (e) {
    throw new Error(
      `Failed to increase cache value for key "${key}": ${e.message}`
    );
  }
};

const decreaseTokens = async (key: string) => {
  try {
    return await cache.decr(key);
  } catch (e) {
    throw new Error(
      `Failed to decrease cache value for key "${key}": ${e.message}`
    );
  }
};

const getCacheValue = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await cache.get(key);
    if (!value) return null;
    return JSON.parse(value.toString()) as T;
  } catch (e) {
    throw new Error(
      `Failed to get JSON cache value for key "${key}": ${e.message}`
    );
  }
};

export default {
  increaseTokens,
  decreaseTokens,
  getCacheValue,
  deleteCacheValue,
};
