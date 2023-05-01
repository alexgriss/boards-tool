type Attributes = {
  border: string;
};

type Text = {
  main: string;
  title: string;
};

type Button = {
  hover: string;
  active: string;
};

type Elements = {
  button: Button;
};

export type Theme = {
  attributes: Attributes;
  text: Text;
  elements: Elements;
};
