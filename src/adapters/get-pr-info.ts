import { HttpClient } from './HttpClient';

const PAT = process.env.PAT

export interface IGetPrInfo {
    Execute(owner: string, repo: string, pullNumber: number): Promise<GetPrResponse>
}


interface GhPr {
    commits: number
    additions: number
    deletions: number
    changed_files: number
    comments: number
    review_comments: number
}

export interface GetPrResponse {
    commits: number
    additions: number
    deletions: number
    changed_files: number
    comments: number
    review_comments: number
}

export class GetPrInfo implements IGetPrInfo {
    public async Execute(owner: string, repo: string, pullNumber: number): Promise<GetPrResponse> {
        console.log('getting pr ' + pullNumber)

        return await this.getPr(owner, repo, pullNumber)
    }

    private async getPr(owner: string, repo: string, pullNumber: number): Promise<GhPr> {
        const client = new HttpClient("https://api.github.com/repos")
        const pr = await client.Get<GhPr>(`/${owner}/${repo}/pulls/${pullNumber}`, PAT)
        // console.log(`getting page ${page}, got ${prFiles.data.length} results`)

        return pr.data
    }
}
