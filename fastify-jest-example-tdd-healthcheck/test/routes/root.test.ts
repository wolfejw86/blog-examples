import { build } from '../helper';

describe('root tests', () => {
    const app = build();

    test('default root route', async () => {
        const res = await app.inject({
            url: '/',
        });
        expect(JSON.parse(res.payload)).toEqual({ root: true });
    });
});
