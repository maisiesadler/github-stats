import { GetTimeToClose } from '.';

export interface PrAndChanges {
    changes: {
        commits: number
        additions: number
        deletions: number
        changed_files: number
        comments: number
        review_comments: number
    },
    created_at: string
    updated_at: string
    closed_at: string
    merged_at: string
}

export interface IGetPrsWithChanges {
    Execute(owner: string, repo: string): Promise<PrAndChanges[]>
}

export class GetTimeToCloseVsChangesInterator {
    private readonly getTimeToClose: GetTimeToClose = new GetTimeToClose();
    constructor(
        private readonly getPrs: IGetPrsWithChanges) {
    }

    public async Execute(owner: string, repo: string): Promise<{ pr: PrAndChanges; error?: 'NotClosed'; ttc?: number; }[]> {
        const prs = await this.getPrs.Execute(owner, repo);
        return prs.map(pr => {
            const ttc = this.getTimeToClose.Execute(pr);
            if (ttc.error) {
                return { pr, error: ttc.error };
            }
            return { pr, ttc: ttc.seconds };
        });
    }
}
