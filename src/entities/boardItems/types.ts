export type TBoardItem = {
  id: string;
  title: string;
};

export type TBoardGroups = Record<string, TBoardItem[]>;
