"use client";

import { useState } from "react";
import { SearchBar } from "@/components/users/search-bar";
import { UserSearchResult } from "@/components/users/user-search-result";
import { UserSearchEmpty } from "@/components/users/user-search-empty";
import { LoadingState } from "@/components/state/loading-state";
import { useUserSearch } from "@/lib/hooks/queries/use-user-search";

export default function UserSearchPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading, isFetching } = useUserSearch(query);

  const hasQuery = query.trim().length > 0;
  const results = data?.data ?? [];

  return (
    <div className="mx-auto flex min-h-screen max-w-[600px] flex-col bg-black">
      <div className="flex items-center gap-4 border-b border-gray-900 px-4 py-3 md:px-6 md:py-4">
        <SearchBar onQueryChange={setQuery} />
      </div>

      <div className="flex-1">
        {!hasQuery && (
          <div className="flex flex-col items-center justify-center gap-1 py-24 text-center">
            <p className="text-md text-gray-400">
              Search for people by name or username
            </p>
          </div>
        )}

        {hasQuery && (isLoading || isFetching) && (
          <div className="px-4 py-4">
            <LoadingState />
          </div>
        )}

        {hasQuery && !isLoading && !isFetching && results.length === 0 && (
          <UserSearchEmpty />
        )}

        {hasQuery && !isLoading && !isFetching && results.length > 0 && (
          <div className="flex flex-col">
            {results.map((user) => (
              <UserSearchResult key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
