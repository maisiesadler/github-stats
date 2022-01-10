import { expect } from 'chai';
import 'mocha';
import { GetReadableSeconds } from '../../src/interactors';

describe('readable seconds', function () {

    [
        { seconds: -10 },
    ].forEach(({ seconds }) => {
        it(`Invalid '${seconds}'`, async () => {

            const interactor = new GetReadableSeconds()

            const result = interactor.Execute(seconds)

            expect(result.text).to.equal('Invalid')
        })
    });

    [
        { seconds: 1, expectedText: '1 second' },
        { seconds: 6, expectedText: '6 seconds' },
        { seconds: 60, expectedText: '1 minute' },
        { seconds: 600, expectedText: '10 minutes' },
        { seconds: 606, expectedText: '10 minutes and 6 seconds' },
    ].forEach(({ seconds, expectedText }) => {
            it(`Seconds and minutes: ${seconds}`, async () => {

                const interactor = new GetReadableSeconds()

                const result = interactor.Execute(seconds)

                expect(result.text).to.equal(expectedText)
            })
        });
})
