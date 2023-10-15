import { TGroup } from '../groups';

export type TBoard = {
  id: string;
  name: string;
  items: TGroup[];
};
