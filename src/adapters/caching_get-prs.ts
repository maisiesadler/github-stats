import { FileCache } from "./FileCache"
import { IGetPrs, GetPrsResponse } from "./get-prs"

export class CachingGetPrs implements IGetPrs {
    private readonly cache = new FileCache<GetPrsResponse>();
    constructor(private readonly getPrs: IGetPrs) {
    }

    public async Execute(owner: string, repo: string): Promise<GetPrsResponse> {
        const cacheKey = `${owner}_${repo}_pr.json`
        const { success, value } = this.cache.TryGet(cacheKey)
        if (success) {
            return value;
        }

        const result = await this.getPrs.Execute(owner, repo)
        this.cache.Set(cacheKey, result)
        return result;
    }
}
