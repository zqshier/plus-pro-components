import { dayjs } from 'element-plus'

/**
 *
 * @param {string | number | Date | Dayjs | null | undefined} date
 * @param format 默认 YYYY-MM-DD HH:mm:ss
 * @returns YYYY-MM-DD HH:mm:ss
 */
export function formatDate(date?: dayjs.ConfigType, format = 'YYYY-MM-DD HH:mm:ss'): string {
  if (!date) return ''
  return dayjs(date || new Date()).format(format)
}

export function formatMoney(val: string | number, format = '￥', decimal = 2): string {
  if (!val) return ''
  return `${format}${Number(val).toFixed(decimal)}`
}
