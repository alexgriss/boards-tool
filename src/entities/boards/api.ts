import { API_BASE_URL, create, get, remove, update } from '@/shared/api';

import { TBoard } from './types';

const getBoardsUrl = () => `${API_BASE_URL}/boards`;
const getBoardByIdUrl = (id: string) => `${API_BASE_URL}/boards/${id}`;

export const getBoardById = (id: string) => get<TBoard>(getBoardByIdUrl(id));

export const getBoards = () => get<TBoard[]>(getBoardsUrl());

export const createBoard = (board: TBoard) =>
  create<TBoard>(getBoardsUrl(), board);

export const updateBoard = (board: TBoard) =>
  update<TBoard>(getBoardByIdUrl(board.id), board);

export const removeBoardById = (id: string) =>
  remove<TBoard>(getBoardByIdUrl(id));

export const removeBoards = () => remove<void>(getBoardsUrl());
