import styled from 'styled-components';

import { Theme } from '@/shared';

import { TTextColor, TTextSize } from './types';

interface ITextWrapper {
  size: TTextSize;
  color: TTextColor;
}

const sizeDict: Record<TTextSize, number> = {
  xs: 10,
  s: 14,
  m: 16,
  l: 20,
  xl: 24,
};

const getFontSize = ({ size }: { size: TTextSize }) => sizeDict[size];

const getColor = ({ color, theme }: { color: TTextColor; theme: Theme }) =>
  theme.text[color].color;

export const TextWrapper = styled.div<ITextWrapper>`
  font-size: ${getFontSize}px;

  color: ${getColor};
`;
