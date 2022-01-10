export const quantile
    : (sortedArray: number[], percentile: number) => { ok: boolean, value?: number }
    = (sortedArray: number[], percentile: number) => {
        if (percentile <= 0 || percentile > 100) {
            return { ok: false }
        }

        const kIndex = Math.ceil(sortedArray.length * (percentile / 100)) - 1;
        return {
            ok: true,
            value: sortedArray[kIndex],
        }
    }
