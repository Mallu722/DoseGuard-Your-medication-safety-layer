import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Basic test to verify the app renders without errors
test('app renders without errors', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // The app renders successfully
  expect(document.body).toBeTruthy();
});

