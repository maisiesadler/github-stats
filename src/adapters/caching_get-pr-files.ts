import { FileCache } from "./FileCache"
import { IGetPrFiles, GetPrFilesResponse } from "./get-pr-files";

export class CachingGetPrFiles implements IGetPrFiles {
    private readonly cache = new FileCache<GetPrFilesResponse>();
    constructor(private readonly getPrs: IGetPrFiles) {
    }

    public async Execute(owner: string, repo: string, pullNumber: number): Promise<GetPrFilesResponse> {
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
