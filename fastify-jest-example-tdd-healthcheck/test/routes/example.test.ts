import { build } from '../helper';

describe('example tests', () => {
    const app = build();

    test('example is loaded', async () => {
        const res = await app.inject({
            url: '/example',
        });

        expect(res.payload).toBe('this is an example');
    });
});
