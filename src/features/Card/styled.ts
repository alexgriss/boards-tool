import { styled } from 'styled-components';

export const CardWrapper = styled.div<{
  $isDragging: boolean;
  $isDragOverlay: boolean;
}>`
  margin-bottom: 8px;
  padding: 10px;

  border-radius: 8px;

  color: rgba(255, 255, 255, 1);

  background-color: rgba(0, 0, 0, 0.8);

  font-size: 14px;

  transition: 0.5s background-color;

  opacity: ${({ $isDragging, $isDragOverlay }) =>
    $isDragOverlay ? 0.5 : $isDragging ? 0 : 1};

  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'pointer')};

  &:hover {
    background-color: rgba(0, 0, 0, 1);
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;
