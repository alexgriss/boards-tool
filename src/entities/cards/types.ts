export type TCard = {
  id: string;
  title: string;
};

export type TCardGroups = Record<string, TCard[]>;
