import styled from 'styled-components';
import { IIconMainProps } from './types';

const getSizes = ({
  width,
  height,
}: Pick<IIconMainProps, 'width' | 'height'>) => `
  ${width ? 'width: ' + width + 'px' : 'width: auto'};
  ${height ? 'height: ' + height + 'px' : 'height: auto'};
`;

export const IconWrapper = styled.div<IIconMainProps>`
  ${({ width, height }: Pick<IIconMainProps, 'width' | 'height'>) =>
    getSizes({ width, height })};

  & > svg {
    ${({ width, height }: Pick<IIconMainProps, 'width' | 'height'>) =>
      getSizes({ width, height })};
    ${({ fill }: Pick<IIconMainProps, 'fill'>) => fill && `fill: ${fill}`};
  }
`;
