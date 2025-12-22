-- 添加消息附件文件字段
-- files: JSON 格式存储文件列表，用于多模态对话
ALTER TABLE `messages` ADD COLUMN `files` text;
