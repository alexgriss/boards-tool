import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const withDND = (reactNode: React.ReactNode) => (
  <DndProvider backend={HTML5Backend}>{reactNode}</DndProvider>
);
