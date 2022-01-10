const secondsInHour = 60 * 60
const secondsInMinute = 60

export class GetReadableSeconds {
    public Execute(totalSeconds: number): { text: string } {
        if (totalSeconds < 0) return { text: 'Invalid' }

        let remaining = totalSeconds

        const hours = Math.floor(totalSeconds / secondsInHour)
        remaining = remaining - hours * secondsInHour
        const minutes = Math.floor(remaining / secondsInMinute)
        const seconds = remaining - minutes * secondsInMinute

        const text = this.asText({ hours, minutes, seconds })
        return { text }
    }

    private asText({ hours, minutes, seconds }: { hours: number, minutes: number, seconds: number }) {
        const parts = []

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
