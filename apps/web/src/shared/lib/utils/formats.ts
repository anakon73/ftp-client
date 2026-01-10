const DEFAULT_DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
}

export function formatDate(
  value: Date | string | number | null | undefined,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_FORMAT_OPTIONS,
  locale = 'en-US',
): string {
  if (!value)
    return '—'

  try {
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime()))
      return '—'

    const formatter = new Intl.DateTimeFormat(locale, options)
    return formatter.format(date)
  }
  catch (error) {
    console.error('Error formatting date:', error)
    return '—'
  }
}

export function formatSizeInBytes(size: number) {
  if (!size)
    return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let fileSize = size
  let unitIndex = 0

  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024
    unitIndex++
  }

  return `${fileSize.toFixed(1)} ${units[unitIndex]}`
}
