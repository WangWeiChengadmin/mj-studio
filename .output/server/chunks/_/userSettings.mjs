import { eq, and } from 'drizzle-orm';
import { b as db, t as userSettings } from '../nitro/nitro.mjs';
import { a as USER_SETTING_DEFAULTS } from './constants.mjs';

function useUserSettingsService() {
  async function get(userId, key) {
    const [setting] = await db.select().from(userSettings).where(and(eq(userSettings.userId, userId), eq(userSettings.key, key))).limit(1);
    if (setting) {
      return JSON.parse(setting.value);
    }
    return USER_SETTING_DEFAULTS[key];
  }
  async function getAll(userId) {
    const settings = await db.select().from(userSettings).where(eq(userSettings.userId, userId));
    const result = { ...USER_SETTING_DEFAULTS };
    for (const setting of settings) {
      const key = setting.key;
      if (key in USER_SETTING_DEFAULTS) {
        result[key] = JSON.parse(setting.value);
      }
    }
    return result;
  }
  async function set(userId, key, value) {
    const now = /* @__PURE__ */ new Date();
    const jsonValue = JSON.stringify(value);
    const updated = await db.update(userSettings).set({ value: jsonValue, updatedAt: now }).where(and(eq(userSettings.userId, userId), eq(userSettings.key, key)));
    if (updated.changes === 0) {
      await db.insert(userSettings).values({
        userId,
        key,
        value: jsonValue,
        createdAt: now,
        updatedAt: now
      });
    }
  }
  async function setMany(userId, settings) {
    for (const [key, value] of Object.entries(settings)) {
      if (key in USER_SETTING_DEFAULTS) {
        await set(userId, key, value);
      }
    }
  }
  async function remove(userId, key) {
    await db.delete(userSettings).where(and(eq(userSettings.userId, userId), eq(userSettings.key, key)));
  }
  async function removeAll(userId) {
    await db.delete(userSettings).where(eq(userSettings.userId, userId));
  }
  return {
    get,
    getAll,
    set,
    setMany,
    remove,
    removeAll
  };
}

export { useUserSettingsService as u };
//# sourceMappingURL=userSettings.mjs.map
