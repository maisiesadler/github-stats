import { expect } from 'chai';
import 'mocha';
import { GetPrInfo } from '../../src/adapters/get-pr-info';

describe('Get PRs', function () {

    it('Can load PRs for given repo', async () => {
        const getPrFiles = new GetPrInfo()

        const prFiles = await getPrFiles.Execute("maisiesadler", "transaction-api", 2);

        expect(prFiles.changed_files).to.equal(18)
        expect(prFiles.additions).to.equal(351)
        expect(prFiles.deletions).to.equal(157)
        expect(prFiles.comments).to.equal(0)
    });
});
