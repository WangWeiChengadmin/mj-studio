import { d as defineEventHandler, r as requireAuth, g as getRouterParam, a as readBody, c as createError, b as db, H as workflowTemplates, G as workflows } from '../../../../nitro/nitro.mjs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { eq, sql } from 'drizzle-orm';
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
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'drizzle-orm/better-sqlite3/migrator';
import 'node:url';
import '@iconify/utils';
import 'consola';

const use_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const userId = user.id;
  const id = Number(getRouterParam(event, "id"));
  const body = await readBody(event);
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u6A21\u677FID" });
  }
  const [template] = await db.select().from(workflowTemplates).where(eq(workflowTemplates.id, id)).limit(1);
  if (!template) {
    throw createError({ statusCode: 404, message: "\u6A21\u677F\u4E0D\u5B58\u5728" });
  }
  const templatePath = join(process.cwd(), "data/workflow-templates", template.filename);
  let templateData;
  try {
    const content = await readFile(templatePath, "utf-8");
    templateData = JSON.parse(content);
  } catch (error) {
    throw createError({ statusCode: 500, message: "\u6A21\u677F\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25" });
  }
  const workflowName = (body == null ? void 0 : body.name) || `${template.name} - \u526F\u672C`;
  const filename = `wf-${Date.now()}.json`;
  const filePath = join(process.cwd(), "data/workflows", filename);
  const workflowData = {
    ...templateData,
    name: workflowName,
    metadata: {
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
  await writeFile(filePath, JSON.stringify(workflowData, null, 2), "utf-8");
  const [result] = await db.insert(workflows).values({
    userId,
    name: workflowName,
    description: template.description,
    filename
  }).returning();
  await db.update(workflowTemplates).set({ usageCount: sql`${workflowTemplates.usageCount} + 1` }).where(eq(workflowTemplates.id, id));
  return {
    success: true,
    data: {
      id: result.id,
      name: result.name
    }
  };
});

export { use_post as default };
//# sourceMappingURL=use.post.mjs.map
