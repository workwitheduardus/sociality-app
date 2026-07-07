import { api, buildQuery } from "../api-client";
import { Post, PaginatedResponse, PaginationParams } from "@/app/types/api";

export const feedApi = {
  get: (params: PaginationParams = {}) =>
    api.get<PaginatedResponse<Post>>(`/api/feed${buildQuery(params)}`),
};
