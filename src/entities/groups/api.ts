import { API_BASE_URL, create, get, remove, update } from '@/shared/api';

import { TGroup } from './types';

const getGroupsUrl = () => `${API_BASE_URL}/groups`;
const getGroupByIdUrl = (id: string) => `${API_BASE_URL}/groups/${id}`;

export const getGroupById = (id: string) => get<TGroup>(getGroupByIdUrl(id));

export const getGroups = () => get<TGroup[]>(getGroupsUrl());

export const createGroup = (group: TGroup) =>
  create<TGroup>(getGroupsUrl(), group);

export const updateGroup = (id: string, group: TGroup) =>
  update<TGroup>(getGroupByIdUrl(id), group);

export const removeGroupById = (id: string) =>
  remove<TGroup>(getGroupByIdUrl(id));

export const removeGroups = () => remove<TGroup>(getGroupsUrl());
