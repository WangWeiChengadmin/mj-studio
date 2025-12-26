-- 重构：model_configs → upstreams，model_type_configs JSON → aimodels 表
-- 注意：model_type_configs 数据迁移由 migrate.ts 中的 migrateModelTypeConfigsToAimodels() 处理
-- 该函数会在 DROP COLUMN 之前读取 JSON 数据并写入 aimodels 表

-- 1. 重命名主表
ALTER TABLE `model_configs` RENAME TO `upstreams`;-->statement-breakpoint

-- 2. 重命名 upstreams 表的列
ALTER TABLE `upstreams` RENAME COLUMN "balance_api_type" TO "upstream_platform";-->statement-breakpoint
ALTER TABLE `upstreams` RENAME COLUMN "balance_api_key" TO "user_api_key";-->statement-breakpoint

-- 3. 重命名关联表中的外键列
ALTER TABLE `assistants` RENAME COLUMN "model_config_id" TO "upstream_id";-->statement-breakpoint
ALTER TABLE `messages` RENAME COLUMN "model_config_id" TO "upstream_id";-->statement-breakpoint

-- 4. 创建 aimodels 子表（数据由 migrate.ts 填充）
CREATE TABLE `aimodels` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`upstream_id` integer NOT NULL,
	`category` text NOT NULL,
	`model_type` text NOT NULL,
	`api_format` text NOT NULL,
	`model_name` text NOT NULL,
	`estimated_time` integer DEFAULT 60 NOT NULL,
	`key_name` text DEFAULT 'default' NOT NULL,
	`created_at` integer NOT NULL
);-->statement-breakpoint

-- 5. 添加新列
ALTER TABLE `upstreams` ADD `upstream_info` text;-->statement-breakpoint
ALTER TABLE `assistants` ADD `aimodel_id` integer;-->statement-breakpoint
ALTER TABLE `messages` ADD `aimodel_id` integer;-->statement-breakpoint

-- 6. 重建 tasks 表（添加 upstream_id 和 aimodel_id，移除 model_config_id）
-- 注意：从旧表的 model_config_id 读取，写入新表的 upstream_id
-- aimodel_id 设为 0，由 migrate.ts 的 migrateTaskAimodelIds() 填充
PRAGMA foreign_keys=OFF;-->statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer DEFAULT 1 NOT NULL,
	`upstream_id` integer NOT NULL,
	`aimodel_id` integer NOT NULL DEFAULT 0,
	`model_type` text NOT NULL,
	`api_format` text NOT NULL,
	`model_name` text NOT NULL,
	`prompt` text,
	`negative_prompt` text,
	`images` text DEFAULT '[]',
	`type` text DEFAULT 'imagine' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`upstream_task_id` text,
	`progress` text,
	`image_url` text,
	`error` text,
	`is_blurred` integer DEFAULT true NOT NULL,
	`unique_id` text,
	`source_type` text DEFAULT 'workbench',
	`buttons` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);-->statement-breakpoint
INSERT INTO `__new_tasks`("id", "user_id", "upstream_id", "aimodel_id", "model_type", "api_format", "model_name", "prompt", "negative_prompt", "images", "type", "status", "upstream_task_id", "progress", "image_url", "error", "is_blurred", "unique_id", "source_type", "buttons", "created_at", "updated_at", "deleted_at") SELECT "id", "user_id", "model_config_id", 0, "model_type", "api_format", "model_name", "prompt", "negative_prompt", "images", "type", "status", "upstream_task_id", "progress", "image_url", "error", "is_blurred", "unique_id", "source_type", "buttons", "created_at", "updated_at", "deleted_at" FROM `tasks`;-->statement-breakpoint
DROP TABLE `tasks`;-->statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;-->statement-breakpoint
PRAGMA foreign_keys=ON;-->statement-breakpoint

-- 7. 最后删除 model_type_configs 列（数据已由 migrate.ts 迁移到 aimodels 表）
-- 注意：这必须在 migrate.ts 数据迁移之后执行，但 drizzle migrate 是先于 plugin 代码执行的
-- 因此我们不在这里删除该列，而是保留它，让 migrate.ts 完成数据迁移后由后续版本清理
-- ALTER TABLE `upstreams` DROP COLUMN `model_type_configs`;
