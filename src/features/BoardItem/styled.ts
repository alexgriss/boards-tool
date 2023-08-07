import { styled } from 'styled-components';

export const BoardItemWrapper = styled.div<{
  $isDragging: boolean;
  $isDragOverlay?: boolean;
}>`
  margin-bottom: 8px;
  padding: 8px;

  border-radius: 8px;

  color: ${({ theme }) => theme.boardItem.text.color};

  background-color: ${({ theme }) => theme.boardItem.background.color};

  opacity: ${({ $isDragging, $isDragOverlay }) =>
    $isDragOverlay || $isDragging ? 0.5 : 1};

  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};

  &:last-of-type {
    margin-bottom: 0;
  }
`;
