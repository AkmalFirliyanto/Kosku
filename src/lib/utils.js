/**
 * Format angka ke format Rupiah Indonesia
 * @param {number} amount
 * @returns {string}
 */
export function formatRupiah(amount) {
  if (!amount && amount !== 0) return '-'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Hitung waktu tersisa untuk countdown
 * @param {string} targetDate - ISO date string
 * @returns {object} { days, hours, minutes, seconds, isExpired }
 */
export function getTimeRemaining(targetDate) {
  const total = new Date(targetDate).getTime() - new Date().getTime()

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isExpired: false,
  }
}

/**
 * Format tanggal ke format Indonesia
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
