import { IconWrapper } from './styled';
import { IIconMainProps } from './types';

interface IIcon extends IIconMainProps {
  icon: React.ReactNode;
}

export const Icon = ({ width, height, fill, icon }: IIcon) => {
  return (
    <IconWrapper width={width} height={height} fill={fill}>
      {icon}
    </IconWrapper>
  );
};
