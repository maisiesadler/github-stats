export interface PR {
    created_at: string
    updated_at: string
    closed_at: string
    merged_at: string
}

export class GetTimeToClose {
    public Execute(pr: PR): { seconds: number } {
        const diff = Date.parse(pr.closed_at) - Date.parse(pr.created_at)
        return { seconds: diff / 1000 }
    }
}
