import { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const withDND = (reactNode: ReactNode) => (
  <DndProvider backend={HTML5Backend}>{reactNode}</DndProvider>
);
