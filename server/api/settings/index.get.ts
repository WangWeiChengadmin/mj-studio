// GET /api/settings - 获取用户设置
import { useUserSettingsService } from '../../services/userSettings'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const settingsService = useUserSettingsService()

  const settings = await settingsService.getAll(user.id)

  return settings
})
