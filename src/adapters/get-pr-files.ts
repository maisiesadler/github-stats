import { HttpClient } from './HttpClient';

const PAT = process.env.PAT

export interface IGetPrFiles {
    Execute(owner: string, repo: string, pullNumber: number): Promise<GetPrFilesResponse>
}

interface GhPrFile {
    additions: number
    deletions: number
    changes: number
}

interface GetPrFilesResponse {
    filesChanged: number
    totalAdditions: number
    totalDeletions: number
    totalChanges: number
}

export class GetPrFiles implements IGetPrFiles {
    public async Execute(owner: string, repo: string, pullNumber: number): Promise<GetPrFilesResponse> {

        const results = {
            filesChanged: 0,
            totalAdditions: 0,
            totalDeletions: 0,
            totalChanges: 0,
        }

        const add: (prFile: GhPrFile) => void = (prFile: GhPrFile) => {
            results.filesChanged++
            results.totalAdditions += prFile.additions
            results.totalDeletions += prFile.deletions
            results.totalChanges += prFile.changes
        }

        let page = 1
        let pageResults = await this.getPage(owner, repo, pullNumber, page)
        pageResults.forEach(r => add(r))

        while (pageResults.length > 0 && page < 5) {
            pageResults = await this.getPage(owner, repo, pullNumber, ++page)
            pageResults.forEach(r => add(r))
        }

        return results
    }

    private async getPage(owner: string, repo: string, pullNumber: number, page: number): Promise<GhPrFile[]> {
        const client = new HttpClient("https://api.github.com/repos")
        const prFiles = await client.Get<GhPrFile[]>(`/${owner}/${repo}/pulls/${pullNumber}/files?per_page=100&page=${page}`, PAT)
        // console.log(`getting page ${page}, got ${prFiles.data.length} results`)

        return prFiles.data
            .map(pr => ({
                additions: pr.additions,
                deletions: pr.deletions,
                changes: pr.changes,
            }))
    }
}
