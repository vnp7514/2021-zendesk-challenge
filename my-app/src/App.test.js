import { render, screen } from '@testing-library/react';
import App from './App';

test('Application starts with 1 button', () => {
  const {container} = render(<App />);
  expect(container).toMatchSnapshot();
});
