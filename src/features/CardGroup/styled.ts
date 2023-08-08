import { styled } from 'styled-components';

export const CardGroupWrapper = styled.div<{
  $isDragOverlay?: boolean;
}>`
  width: 272px;
  min-width: 272px;
  height: fit-content;

  margin-right: 20px;
  padding: 8px;

  border-radius: 8px;

  background-color: rgba(255, 255, 255, 0.6);

  opacity: ${({ $isDragOverlay }) => ($isDragOverlay ? 0.5 : 0.8)};
  scroll-margin: 320px;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export const CardGroupHeader = styled.div<{
  $isDragging: boolean;
}>`
  margin-bottom: 8px;

  color: ${({ theme }) => theme.boardGroup.header.text.color};

  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};

  font-weight: 600;
  font-size: 14px;
`;
