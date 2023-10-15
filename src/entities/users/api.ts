import { API_BASE_URL, create, get, remove, update } from '@/shared/api';

import { TUser } from './types';

const getUsersUrl = () => `${API_BASE_URL}/users`;
const getUserByUsernameUrl = (username: string) =>
  `${API_BASE_URL}/users/?username=${username}`;

export const getUserByUsername = (username: string) =>
  get<TUser>(getUserByUsernameUrl(username));

export const getUsers = () => get<TUser[]>(getUsersUrl());

export const createUser = (user: TUser) => create<TUser>(getUsersUrl(), user);

export const updateUser = (username: string, user: TUser) =>
  update<TUser>(getUserByUsernameUrl(username), user);

export const removeUserByUsername = (username: string) =>
  remove<TUser>(getUserByUsernameUrl(username));
