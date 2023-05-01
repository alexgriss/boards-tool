import { SIcon } from './styled';
import { IIconMainProps } from './types';

interface IIcon extends IIconMainProps {
  icon: React.ReactNode;
}

export const Icon = ({ width, height, fill, icon }: IIcon) => (
  <SIcon width={width} height={height} fill={fill}>
    {icon}
  </SIcon>
);
