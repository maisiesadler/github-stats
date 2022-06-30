import { IGetPrsWithChanges, PrAndChanges } from '../interactors';
import { IGetPrInfo } from './get-pr-info';
import { IGetPrs } from './get-prs';

const PAT = process.env.PAT

export class GetPrsWithChanges implements IGetPrsWithChanges {
    constructor(private readonly getPrs: IGetPrs, private readonly getPrFiles: IGetPrInfo) {

    }

    public async Execute(owner: string, repo: string): Promise<PrAndChanges[]> {
        const prs = await this.getPrs.Execute(owner, repo)

        const prsAndChanges: PrAndChanges[] = []

        for (let i = 0; i < prs.results.length; i++) {
            const pr = prs.results[i]

            const changes = await this.getPrFiles.Execute(owner, repo, pr.number)
            prsAndChanges.push({
                ...pr,
                changes
            })
        }

        return prsAndChanges
    }
}
