/**
 * **generateMocks** returns an array from given *structure* with *number* elements
 * @param structure
 * @param number
 * @returns array from structure
 */
export const generateMocks = <T>(structure: T, number = 1) => {
  let id = 0;

  return Array(number)
    .fill(structure)
    .map((i: T) => ({ id: id++, ...i })) as Array<T>;
};
