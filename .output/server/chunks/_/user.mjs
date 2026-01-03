import { b as db, u as users } from '../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';

function useUserService() {
  async function findByEmail(email) {
    return db.query.users.findFirst({
      where: eq(users.email, email)
    });
  }
  async function findById(id) {
    return db.query.users.findFirst({
      where: eq(users.id, id)
    });
  }
  async function createUser(data) {
    var _a;
    const [user] = await db.insert(users).values({
      email: data.email,
      password: data.password,
      name: (_a = data.name) != null ? _a : null
    }).returning();
    return user;
  }
  return {
    findByEmail,
    findById,
    createUser
  };
}

export { useUserService as u };
//# sourceMappingURL=user.mjs.map
