export const isInViewport = (
  element: HTMLElement,
  { right, width } = element.getBoundingClientRect()
) => {
  console.log(right + width >= 0);
  return (
    element.parentElement &&
    right <= element.parentElement.offsetWidth &&
    right + width >= 0
  );
};
