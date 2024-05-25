import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import Home from '@/app/page';
import { renderWithProviders } from '@/utils/test.utils';
import { screen } from '@testing-library/react';

export const handlers = [
  http.get('/api/user', async () => {
    await delay(150);
    return HttpResponse.json('John Smith');
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('----MY TEST CASE: ', async () => {
  renderWithProviders(<Home />);
});
