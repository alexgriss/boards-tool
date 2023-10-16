/**
 * **isInViewport** defines if a given *HTMLElement* has collision with the right boundary of its parent element
 *
 * @param element HTMLElement
 * @param rect DOMRect
 * */
export const isInViewport = (
  element: HTMLElement,
  { right, width } = element.getBoundingClientRect()
) => {
  return (
    element.parentElement &&
    right <= element.parentElement.offsetWidth &&
    right + width >= 0
  );
};
