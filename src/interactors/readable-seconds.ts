const secondsInDay = 24 * 60 * 60
const secondsInHour = 60 * 60
const secondsInMinute = 60

export class GetReadableSeconds {
    public Execute(totalSeconds: number): { text: string } {
        if (totalSeconds < 0) return { text: 'Invalid' }

        let remaining = totalSeconds

        const days = Math.floor(remaining / secondsInDay)
        remaining = remaining - days * secondsInDay
        const hours = Math.floor(remaining / secondsInHour)
        remaining = remaining - hours * secondsInHour
        const minutes = Math.floor(remaining / secondsInMinute)
        const seconds = remaining - minutes * secondsInMinute

        const text = this.asText({ days, hours, minutes, seconds })
        return { text }
    }

    private asText({ days, hours, minutes, seconds }: { days: number, hours: number, minutes: number, seconds: number }) {
        const parts = []

        if (days === 1) {
            parts.push('1 day')
        } else if (days > 0) {
            parts.push(`${days} days`)
        }

        if (hours === 1) {
            parts.push('1 hour')
        } else if (hours > 0) {
            parts.push(`${hours} hours`)
        }

        if (minutes === 1) {
            parts.push('1 minute')
        } else if (minutes > 0) {
            parts.push(`${minutes} minutes`)
        }

        if (seconds === 1) {
            parts.push('1 second')
        } else if (seconds > 0) {
            parts.push(`${seconds} seconds`)
        }

        return parts.join(' and ')
    }
}
