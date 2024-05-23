type TMethod = 'POST' | 'PUT' | 'DELETE';

interface IGenerateRequest<T> {
  url: string;
  method?: TMethod;
  body?: T;
}

export const generateRequest = async <T>({
  url,
  method,
  body,
}: IGenerateRequest<T>): Promise<T> => {
  const response = await fetch(
    url,
    method && {
      method,
      body: JSON.stringify(body),
    }
  );

  return await response.json();
};
