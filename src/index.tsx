import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { Duration } from 'google-protobuf/google/protobuf/duration_pb';

import {
  StreamRequest,
  StreamResponse,
} from 'anyboards-proto/gen/js/debug/debug_pb';
import { DebugClient } from 'anyboards-proto/gen/js/debug/DebugServiceClientPb';

import { App } from '@/app';

import { GlobalStyle, theme } from '@/shared';

const connect = async () => {
  const debugClient = new DebugClient('http://localhost:2222');

  const streamRequest = new StreamRequest();

  streamRequest.setInterval(new Duration().setSeconds(3));

  const stream = debugClient.stream(streamRequest);

  stream.on('data', (response: StreamResponse) => {
    console.log(response.getMessageNum());
  });
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
