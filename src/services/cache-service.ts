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

const setCacheValue = async <T>(key: string, value: T, timeSpan?: number) => {
  try {
    const jsonString = JSON.stringify(value);
    const options = timeSpan ? { EX: timeSpan } : {};
    await cache.set(key, jsonString, options);
  } catch (e) {
    throw new Error(
      `Failed to set JSON cache value for key "${key}": ${e.message}`
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
  setCacheValue,
  getCacheValue,
  deleteCacheValue,
};
