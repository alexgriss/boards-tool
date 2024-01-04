import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ListBoardResponseItem } from 'anyboards-proto/gen/js/boards/boards_pb';
import { BoardsClient } from 'anyboards-proto/gen/js/boards/BoardsServiceClientPb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import { ThemeProvider } from 'styled-components';

import { App } from '@/app';

import { GlobalStyle, theme } from '@/shared';

const connect = async () => {
  const boardsClient = new BoardsClient('http://localhost:2222');

  const boardsList = await boardsClient
    .listBoards(new google_protobuf_empty_pb.Empty(), null)
    .then((res) =>
      res
        .getItemList()
        .map((board) => board.toObject() as ListBoardResponseItem.AsObject)
    );

  console.log(boardsList);
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
