import { generateRandomString } from './generate-random-string';

/**
 * **generateMocks** returns an array from given *structure* with *number* elements
 * @param structure
 * @param number
 * @returns array from structure
 */
export const generateMocks = <T>(structure: T, number = 1) => {
  return Array(number)
    .fill(structure)
    .map((i: T) => ({
      id: generateRandomString(),
      ...i,
      title: (i as T & { title: string }).title + ` #${generateRandomString()}`,
    })) as Array<T>;
};
