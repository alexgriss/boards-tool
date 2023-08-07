import { styled } from 'styled-components';

export const BoardGroupWrapper = styled.div<{
  $isDragging: boolean;
  $isDragOverlay?: boolean;
}>`
  width: 272px;
  height: fit-content;

  margin-right: 20px;
  padding: 8px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.boardGroup.background.color};

  opacity: ${({ $isDragging, $isDragOverlay }) =>
    $isDragOverlay || $isDragging ? 0.5 : 1};

  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};

  &:last-of-type {
    margin-right: 0;
  }
`;

export const BoardGroupHeader = styled.div`
  margin-bottom: 8px;

  color: ${({ theme }) => theme.boardGroup.header.text.color};
`;
