export class GetReadableSeconds {
    public Execute(totalSeconds: number): { text: string } {
        if (totalSeconds < 0) return { text: 'Invalid' }

        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds - minutes * 60

        const text = this.asText({ minutes, seconds })
        return { text }
    }

    private asText({ minutes, seconds }: { minutes: number, seconds: number }) {
        const parts = []

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
