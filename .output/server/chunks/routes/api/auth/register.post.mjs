import { d as defineEventHandler, a as readBody, c as createError, h as hashPassword, s as signJwt } from '../../../nitro/nitro.mjs';
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

const register_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, name } = body;
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u548C\u5BC6\u7801"
    });
  }
  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      message: "\u5BC6\u7801\u81F3\u5C116\u4F4D"
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"
    });
  }
  const userService = useUserService();
  const existingUser = await userService.findByEmail(email);
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: "\u8BE5\u90AE\u7BB1\u5DF2\u6CE8\u518C"
    });
  }
  const hashedPassword = await hashPassword(password);
  const user = await userService.createUser({
    email,
    password: hashedPassword,
    name
  });
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

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
