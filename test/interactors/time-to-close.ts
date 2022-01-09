import { expect } from 'chai';
import 'mocha';
import { GetTimeToClose } from '../../src/interactors';

describe('Get PRs', function () {

    [
        {
            pr: {
                created_at: '2021-08-30T06:14:56Z',
                updated_at: '2021-08-30T06:16:04Z',
                closed_at: '2021-08-30T06:16:01Z',
                merged_at: '2021-08-30T06:16:01Z'
            }, expectedSeconds: 65
        },
        {
            pr: {
                created_at: '2021-09-08T17:55:02Z',
                updated_at: '2021-09-08T17:55:09Z',
                closed_at: '2021-09-08T17:55:07Z',
                merged_at: '2021-09-08T17:55:07Z'
            }, expectedSeconds: 5
        }
    ].forEach(({ pr, expectedSeconds }) => {
        it('Can load PRs for given repo', async () => {

            const interactor = new GetTimeToClose()

            const result = interactor.Execute(pr)

            expect(result.seconds).to.equal(expectedSeconds)
        })
    })

    it('No closed time returns error', async () => {

        const interactor = new GetTimeToClose()

        const result = interactor.Execute({
            created_at: '2022-01-08T23:21:44Z',
            updated_at: '2022-01-09T16:39:02Z',
        })

        expect(result.error).to.equal('NotClosed')
    })
})
