"use client";

import { useEffect, useRef } from "react";
import { useFeed } from "@/lib/hooks/queries/use-feed";
import { PostCard } from "@/components/post/post-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import { EmptyState } from "@/components/state/empty-state";
import { ErrorState } from "@/components/state/error-state";
import { LoadingState } from "@/components/state/loading-state";

export default function FeedPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed();
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 },
    );
    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mx-auto flex max-w-[600px] flex-col gap-4 px-4 pb-24 pt-6 md:gap-6 md:pt-10">
      {isLoading && <LoadingState />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && posts.length === 0 && (
        <EmptyState message="Follow people to see their posts here" />
      )}

      {posts.map((post) => (
        <div key={post.id} className="border-b border-gray-900 pb-4 md:pb-6">
          <PostCard post={post} />
        </div>
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1" />}
      {isFetchingNextPage && <LoadingState />}

      <BottomNav />
    </div>
  );
}
