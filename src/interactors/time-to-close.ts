export interface PR {
    created_at: string
    updated_at: string
    closed_at?: string | null
    merged_at?: string | null
}

export class GetTimeToClose {
    public Execute(pr: PR): { error?: 'NotClosed', seconds?: number } {
        if (!pr.closed_at) {
            return { error: 'NotClosed' }
        }

        const diff = Date.parse(pr.closed_at) - Date.parse(pr.created_at)
        return { seconds: diff / 1000 }
    }
}
