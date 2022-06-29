import { expect } from 'chai';
import 'mocha';
import { GetPrs } from '../../src/adapters';

describe('Get PRs', function () {

    it('Can load PRs for given repo', async () => {
        const getPrs = new GetPrs()

        const prs = await getPrs.Execute("maisiesadler", "transaction-api");

        const expected = {
            '1': 'Refactor templategenerator',
            '2': 'Publish sns',
            '3': 'Delete transaction',
            '4': 'Tidy transaction api refs',
            '5': 'Move slack endpoint to ./transaction-api',
            '6': 'Link slack token',
            '7': 'Change summary structure'
        }
        expect(prs.results.length).to.greaterThanOrEqual(7)
        prs.results.forEach(pr => {
            if (expected.hasOwnProperty(pr.number))
                expect(pr.title).to.equal(expected[pr.number])
        })
    });
});
