import { quantile } from ".";
import { GetReadableSeconds } from "./readable-seconds"
import { GetTimeToClose, PR } from "./time-to-close"

export class SummarizeTimeToClose {
    public Execute(percentiles: number[], prs: PR[])
        : { ok: boolean, value?: number, p: number, friendly?: string }[] {

        let seconds: number[] = []

        const getTimeToClose = new GetTimeToClose();
        const getReadableSeconds = new GetReadableSeconds();
        prs.forEach(pr => {
            const result = getTimeToClose.Execute(pr)
            // console.log(result)
            seconds.push(result.seconds)
        });

        // sort array ascending
        seconds = seconds.sort((a, b) => a - b);

        return percentiles.map(p => {
            const result: { ok: boolean, value?: number, p: number, friendly?: string }
                = { p, ...quantile(seconds, p) }

            if (result.ok) {
                result.friendly = getReadableSeconds.Execute(result.value).text
            }
            return result
        })
    }
}
