export const scrollOptions: Record<string, ScrollIntoViewOptions> = {
  auto: { behavior: 'auto' },
  smooth: { behavior: 'smooth' },
};

/**
 * **scrollIntoView** invokes built-in *scrollIntoView* method on given *Element* or its child by optional *childIndex* value
 *
 * @param element Element
 * @param childIndex number
 * @param options ScrollIntoViewOptions
 * */
export const scrollIntoView = (
  element: Element,
  childIndex?: number,
  options: ScrollIntoViewOptions = scrollOptions.smooth
) => {
  return (childIndex ? element.children[childIndex] : element).scrollIntoView(
    options
  );
};
