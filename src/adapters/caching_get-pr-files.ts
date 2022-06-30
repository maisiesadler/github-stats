import { FileCache } from "./FileCache"
import { IGetPrInfo, GetPrResponse } from "./get-pr-info";

export class CachingGetPrFiles implements IGetPrInfo {
    private readonly cache = new FileCache<GetPrResponse>();
    constructor(private readonly getPrs: IGetPrInfo) {
    }

    public async Execute(owner: string, repo: string, pullNumber: number): Promise<GetPrResponse> {
        const cacheKey = `${owner}_${repo}_pr_${pullNumber}.json`
        const { success, value } = this.cache.TryGet(cacheKey)
        if (success) {
            return value;
        }

        const result = await this.getPrs.Execute(owner, repo, pullNumber)
        this.cache.Set(cacheKey, result)
        return result;
    }
}
