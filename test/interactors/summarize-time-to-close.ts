import { expect } from 'chai';
import { readFileSync } from 'fs';
import 'mocha';
import { SummarizeTimeToClose } from '../../src/interactors';

const file = readFileSync('dotnet-runtime-prs.json', { encoding: 'utf-8' })
const prs = JSON.parse(file).results

describe('Summarize', function () {
    it('Can get percentiles', async () => {

        const interactor = new SummarizeTimeToClose()

        const result = interactor.Execute(
            [10, 20, 50, 75, 90, 99, 100],
            prs)

        expect(JSON.stringify(result)).to.equal(JSON.stringify([
            { p: 10, ok: true, value: 11016 },
            { p: 20, ok: true, value: 17558 },
            { p: 50, ok: true, value: 74293 },
            { p: 75, ok: true, value: 178160 },
            { p: 90, ok: true, value: 522868 },
            { p: 99, ok: true, value: 2099235 },
            { p: 100, ok: true, value: 2604955 }
        ]))
    })
})
