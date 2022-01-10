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
            { p: 10, ok: true, value: 11016, friendly: '3 hours and 3 minutes and 36 seconds' },
            { p: 20, ok: true, value: 17558, friendly: '4 hours and 52 minutes and 38 seconds' },
            { p: 50, ok: true, value: 74293, friendly: '20 hours and 38 minutes and 13 seconds' },
            { p: 75, ok: true, value: 178160, friendly: '2 days and 1 hour and 29 minutes and 20 seconds' },
            { p: 90, ok: true, value: 522868, friendly: '6 days and 1 hour and 14 minutes and 28 seconds' },
            { p: 99, ok: true, value: 2099235, friendly: '24 days and 7 hours and 7 minutes and 15 seconds' },
            { p: 100, ok: true, value: 2604955, friendly: '30 days and 3 hours and 35 minutes and 55 seconds' }
        ]))
    })
})
