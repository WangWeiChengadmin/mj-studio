// Sqids 编解码工具 - 将自增ID转换为短字符串
import Sqids from 'sqids'

// 使用固定的 alphabet 确保编码结果一致
// 移除了容易混淆的字符：0O1lI
const sqids = new Sqids({
  alphabet: 'wNEBY3eVubF4xJRZSvPprtKQdck79C2Hhs6g8yWfUAzTaXGMjmnqD5',
  minLength: 6, // 最小长度，确保ID不会太短
})

// 编码：数字ID -> 短字符串
export function encodeTaskId(id: number): string {
  return sqids.encode([id])
}

// 解码：短字符串 -> 数字ID
export function decodeTaskId(sqid: string): number | null {
  try {
    const decoded = sqids.decode(sqid)
    return decoded.length > 0 ? decoded[0] : null
  } catch {
    return null
  }
}
