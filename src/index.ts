import { writeFileSync } from "fs";
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

    writeFileSync(`data/${owner}_${repo}.json`, JSON.stringify(prs), { encoding: 'utf-8' })

    const summary = ttc.Execute([50, 75, 80, 85, 90, 95, 99], prs.results)

    summary.forEach(({ ok, friendly, value, p }) => {
        console.log(`${p}th percentile closed in ${friendly}`)
    })
}

if (script === 'prs') {
    let owner = process.argv[4]
    let repo = process.argv[3]

    if (!owner) {
        const split = repo.split('/')
        if (split.length === 2) {
            owner = split[0]
            repo = split[1]
        }
    }

    if (!owner || !repo) {
        console.log("Invalid owner or repo")
    } else {
        prsTtc(owner, repo)
            .then(_ => console.log('done'))
            .catch(err => console.log(err))
    }

} else {
    console.error(`Unknown script '${script}'`);
}
