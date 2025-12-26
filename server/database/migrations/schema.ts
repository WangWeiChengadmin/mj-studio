import { sqliteTable, AnySQLiteColumn, uniqueIndex, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	email: text().notNull(),
	password: text().notNull(),
	name: text(),
	createdAt: integer("created_at").notNull(),
	avatar: text(),
},
(table) => [
	uniqueIndex("users_email_unique").on(table.email),
]);

export const assistants = sqliteTable("assistants", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").notNull(),
	name: text().notNull(),
	description: text(),
	avatar: text(),
	systemPrompt: text("system_prompt"),
	upstreamId: integer("upstream_id"),
	modelName: text("model_name"),
	isDefault: integer("is_default").default(false).notNull(),
	createdAt: integer("created_at").notNull(),
	aimodelId: integer("aimodel_id"),
});

export const conversations = sqliteTable("conversations", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").notNull(),
	assistantId: integer("assistant_id").notNull(),
	title: text().notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
});

export const messages = sqliteTable("messages", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	conversationId: integer("conversation_id").notNull(),
	role: text().notNull(),
	content: text().notNull(),
	upstreamId: integer("upstream_id"),
	modelName: text("model_name"),
	createdAt: integer("created_at").notNull(),
	mark: text(),
	sortId: integer("sort_id"),
	status: text(),
	files: text(),
	aimodelId: integer("aimodel_id"),
});

export const tasks = sqliteTable("tasks", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").default(1).notNull(),
	upstreamId: integer("upstream_id").notNull(),
	modelType: text("model_type").notNull(),
	apiFormat: text("api_format").notNull(),
	modelName: text("model_name"),
	prompt: text(),
	images: text().default("[]"),
	type: text().default("imagine").notNull(),
	status: text().default("pending").notNull(),
	upstreamTaskId: text("upstream_task_id"),
	progress: text(),
	imageUrl: text("image_url"),
	error: text(),
	isBlurred: integer("is_blurred").default(true).notNull(),
	buttons: text(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
	deletedAt: integer("deleted_at"),
	negativePrompt: text("negative_prompt"),
	uniqueId: text("unique_id"),
	sourceType: text("source_type").default("workbench"),
	aimodelId: integer("aimodel_id").default(0).notNull(),
});

export const upstreams = sqliteTable("upstreams", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").notNull(),
	name: text().notNull(),
	baseUrl: text("base_url").notNull(),
	apiKey: text("api_key").notNull(),
	modelTypeConfigs: text("model_type_configs").notNull(),
	remark: text(),
	isDefault: integer("is_default").default(false).notNull(),
	createdAt: integer("created_at").notNull(),
	apiKeys: text("api_keys"),
	upstreamPlatform: text("upstream_platform"),
	userApiKey: text("user_api_key"),
	upstreamInfo: text("upstream_info"),
});

export const userSettings = sqliteTable("user_settings", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").notNull(),
	key: text().notNull(),
	value: text().notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
},
(table) => [
	uniqueIndex("user_settings_user_id_key_unique").on(table.userId, table.key),
]);

export const aimodels = sqliteTable("aimodels", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	upstreamId: integer("upstream_id").notNull(),
	category: text().notNull(),
	modelType: text("model_type").notNull(),
	apiFormat: text("api_format").notNull(),
	modelName: text("model_name").notNull(),
	estimatedTime: integer("estimated_time").default(60).notNull(),
	keyName: text("key_name").default("default").notNull(),
	createdAt: integer("created_at").notNull(),
});

