import { expect } from 'chai';
import * as sinon from 'sinon';
import 'mocha';
import { GetTimeToCloseVsChangesInterator, IGetPrsWithChanges } from '../../src/interactors';

const CompletedPromise = <T>(value: T) => new Promise<T>((resolve, reject) => {
    resolve(value)
})

describe('Time to close vs changes', function () {
    [
        {
            prs: [{
                changes: {
                    commits: 1,
                    additions: 10,
                    deletions: 1,
                    changed_files: 11,
                    comments: 12,
                    review_comments: 12,
                },
                created_at: '2021-08-30T06:14:56Z',
                updated_at: '2021-08-30T06:16:04Z',
                closed_at: '2021-08-30T06:16:01Z',
                merged_at: '2021-08-30T06:16:01Z'
            }], expectedSeconds: 65
        }
    ].forEach(({ prs, expectedSeconds }) => {
        it('Can load PRs for given repo', async () => {

            const getPrs: IGetPrsWithChanges = {
                Execute: () => CompletedPromise(prs)
            }
            const getPrsSpy = sinon.spy(getPrs, 'Execute');

            const interactor = new GetTimeToCloseVsChangesInterator(getPrs)

            const result = await interactor.Execute('', '')

            expect(result.length).to.equal(1)
            expect(result[0].ttc).to.equal(expectedSeconds)
        })
    })
})
