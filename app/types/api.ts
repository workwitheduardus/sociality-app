export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email?: string;
  phone?: string;
  bio: string | null;
  avatarUrl: string | null;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowedByMe?: boolean;
  isMe?: boolean;
  followsMe?: boolean;
  createdAt: string;
}

export interface Post {
  id: number;
  caption: string;
  imageUrl: string;
  author: Pick<User, "id" | "username" | "name" | "avatarUrl">;
  likesCount: number;
  commentsCount: number;
  isLikedByMe?: boolean;
  isSavedByMe?: boolean;
  createdAt: string;
}

export interface Comment {
  id: number;
  text: string;
  author: Pick<User, "id" | "username" | "name" | "avatarUrl">;
  postId: number;
  createdAt: string;
  isOwner?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
