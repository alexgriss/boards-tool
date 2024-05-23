import { generateRequest } from './generateRequest';

export const get = <T>(url: string) => {
  return generateRequest<T>({
    url,
  });
};

export const create = <T>(url: string, body: T) => {
  return generateRequest<T>({
    url,
    method: 'POST',
    body,
  });
};

export const update = <T>(url: string, body: T) => {
  return generateRequest<T>({
    url,
    method: 'PUT',
    body,
  });
};

export const remove = <T>(url: string) => {
  return generateRequest<T>({
    url,
    method: 'DELETE',
  });
};
