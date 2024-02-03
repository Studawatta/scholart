import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';

export const renderWithProviders = (component) =>
  render(
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );

// import { render } from '@testing-library/react';
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';

// import userReducer from '../redux/user/userSlice';

// export function renderWithProviders(
//   ui,
//   {
//     preloadedState = {},

//     store = configureStore({ reducer: { user: userReducer }, preloadedState }),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>;
//   }

//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }
