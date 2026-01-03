import { d as defineEventHandler, a as readBody, c as createError, v as verifyPassword, s as signJwt } from '../../../nitro/nitro.mjs';
import { u as useUserService } from '../../../_/user.mjs';
import 'jose';
import 'crypto';
import 'util';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'drizzle-orm';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'path';
import 'drizzle-orm/better-sqlite3/migrator';
import 'node:url';
import '@iconify/utils';
import 'consola';

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u548C\u5BC6\u7801"
    });
  }
  const userService = useUserService();
  const user = await userService.findByEmail(email);
  if (!user) {
    throw createError({
      statusCode: 401,
      message: "\u90AE\u7BB1\u6216\u5BC6\u7801\u9519\u8BEF"
    });
  }
  const isValid = await verifyPassword(user.password, password);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: "\u90AE\u7BB1\u6216\u5BC6\u7801\u9519\u8BEF"
    });
  }
  const token = await signJwt({
    userId: user.id,
    email: user.email,
    name: user.name
  });
  return {
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
