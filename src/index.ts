import { writeFileSync } from "fs";
import { GetPrs } from "./adapters";
import { CachingGetPrFiles } from "./adapters/caching_get-pr-files";
import { CachingGetPrs } from "./adapters/caching_get-prs";
import { GetPrFiles } from "./adapters/get-pr-files";
import { GetPrsWithChanges } from "./adapters/get-prs-and-changes";
import { GetTimeToCloseVsChangesInterator, SummarizeTimeToClose } from "./interactors";

const debugArgs = false
if (debugArgs) {
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });
}

const script = process.argv[2]

async function prsTtcVsChanges(owner: string, repo: string) {
    console.log(`Getting PR summary fo ${owner}/${repo}`)

    const getPrs = new CachingGetPrs(new GetPrs())
    const getPrFiles = new CachingGetPrFiles(new GetPrFiles())
    const getPrsWithChanges = new GetPrsWithChanges(getPrs, getPrFiles)
    const interactor = new GetTimeToCloseVsChangesInterator(getPrsWithChanges);

    // caching layer?
    // const prs = await getPrs.Execute(owner, repo)
    // console.log(`Got ${prs.results.length} PRs`)

    // writeFileSync(`data/${owner}_${repo}.json`, JSON.stringify(prs), { encoding: 'utf-8' })

    const summary = await interactor.Execute(owner, repo)

    const lines = [
        `filesChanged,totalAdditions,totalDeletions,totalChanges,ttc`
    ]

    summary.forEach(({ pr, error, ttc }) => {
        lines.push(`${pr.changes.filesChanged},${pr.changes.totalAdditions},${pr.changes.totalDeletions},${pr.changes.totalChanges},${ttc}`)
    })

    writeFileSync(`ttc_results/${owner}_${repo}.csv`, lines.join('\n'), { encoding: 'utf-8' })
}

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

function tryParseOwnerRepo(): { success: boolean, owner: string, repo: string } {
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
        return { success: false, owner: '', repo: '' }
    }

    return { success: true, owner, repo }
}

if (script === 'prs') {
    const { success, owner, repo } = tryParseOwnerRepo();

    if (!success) {
        console.log("Invalid owner or repo")
    } else {
        prsTtc(owner, repo)
            .then(_ => console.log('done'))
            .catch(err => console.log(err))
    }

} else if (script === 'ttc') {
    const { success, owner, repo } = tryParseOwnerRepo();

    if (!success) {
        console.log("Invalid owner or repo")
    } else {
        prsTtcVsChanges(owner, repo)
            .then(_ => console.log('done'))
            .catch(err => console.log(err))
    }

} else {
    console.error(`Unknown script '${script}'`);
}
