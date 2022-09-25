import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");

type ICreateEntry = {
  poll_id: string;
  option: string;
};

export const fetcher = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_URL"],
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const getPollsPage = async (page = 1, options = {}) => {
  const response = await fetcher.get(`/polls?page=${page}`, options);
  return response.data;
};

export const createEntry = async ({ poll_id, option }: ICreateEntry) => {
  const response = await fetcher.post(`/entry`, {
    poll_id,
    option,
  });
  return response.data;
};

export const getPoll = async (slug: string) => {
  if (slug !== undefined) {
    const response = await fetcher.get(`/polls/${slug}`);
    return response.data;
  }
};

export const createPoll = async (data: any) => {
  const response = await fetcher.post(`/polls`, data);
  return response.data;
};

export const getUsersPolls = async () => {
  const response = await fetcher.get(`/user/polls`);
  return response.data;
};

export const authUser = async (endpoint: string, body: any) => {
  const response = await fetcher.post(endpoint, { ...body });
  return response.data;
};
