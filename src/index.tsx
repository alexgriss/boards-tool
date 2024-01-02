import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BoardsClient } from 'anyboards-proto/gen/js/boards/BoardsServiceClientPb';
import { ThemeProvider } from 'styled-components';

import { App } from '@/app';

import { GlobalStyle, theme } from '@/shared';

const connect = async () => {
  const boardsClient = new BoardsClient('http://localhost:3000');

  console.log(boardsClient);
};

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

connect().then(() =>
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <App />
      </ThemeProvider>
    </StrictMode>
  )
);
