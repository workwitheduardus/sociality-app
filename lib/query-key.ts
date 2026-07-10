export const queryKeys = {
  feed: ["feed"] as const,
  post: (id: number) => ["post", id] as const,
  postLikers: (id: number) => ["post", id, "likers"] as const,
};
