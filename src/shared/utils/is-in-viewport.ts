/**
 * **isInViewport** defines if a given *HTMLElement* has collision with the right boundary of its parent element
 *
 * @param element HTMLElement
 * @param rect DOMRect
 * @returns boolean
 * */
export const isInViewport = (
  element: HTMLElement,
  { right, width } = element.getBoundingClientRect()
) => {
  return Boolean(
    element.parentElement &&
      right <= element.parentElement.offsetWidth &&
      right + width >= 0
  );
};
