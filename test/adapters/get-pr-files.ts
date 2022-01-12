import { expect } from 'chai';
import 'mocha';
import { GetPrFiles } from '../../src/adapters/get-pr-files';

describe('Get PRs', function () {

    it('Can load PRs for given repo', async () => {
        const getPrFiles = new GetPrFiles()

        const prFiles = await getPrFiles.Execute("maisiesadler", "transaction-api", 2);

        expect(prFiles.filesChanged).to.equal(18)
        expect(prFiles.totalAdditions).to.equal(351)
        expect(prFiles.totalDeletions).to.equal(157)
        expect(prFiles.totalChanges).to.equal(508)
    });
});
