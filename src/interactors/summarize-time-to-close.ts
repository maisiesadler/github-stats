import { quantile } from ".";
import { GetTimeToClose, PR } from "./time-to-close"

export class SummarizeTimeToClose {
    public Execute(percentiles: number[], prs: PR[])
        : { ok: boolean, value?: number, p: number }[] {

        let seconds: number[] = []

        const getTimeToClose = new GetTimeToClose();
        prs.forEach(pr => {
            const result = getTimeToClose.Execute(pr)
            // console.log(result)
            seconds.push(result.seconds)
        });

        // sort array ascending
        seconds = seconds.sort((a, b) => a - b);

        return percentiles.map(p => ({ p, ...quantile(seconds, p) }))
    }
}
