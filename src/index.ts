import { GetPrs } from "./adapters";
import { SummarizeTimeToClose } from "./interactors";

const debugArgs = false
if (debugArgs) {
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });
}

const script = process.argv[2]

async function prsTtc(owner: string, repo: string) {
    console.log(`Getting PR summary fo ${owner}/${repo}`)

    const getPrs = new GetPrs()
    const ttc = new SummarizeTimeToClose();

    const prs = await getPrs.Execute(owner, repo)
    console.log(`Got ${prs.results.length} PRs`)

    const summary = ttc.Execute([10, 15, 75, 95], prs.results)

    summary.forEach(({ ok, friendly, value, p }) => {
        console.log(`${p} - ${friendly}`)
    })
}

if (script === 'prs') {
    const owner = process.argv[3]
    const repo = process.argv[4]

    prsTtc(owner, repo)
        .then(_ => console.log('done'))
        .catch(err => console.log(err))
} else {
    console.error(`Unknown script '${script}'`);
}
