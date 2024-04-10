"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Comment } from "@/app/lib/types/comments";

/**
 * The `NavigateToComment` component is responsible for scrolling to a specific comment
 * after it has been loaded on the page, if the comment's `id` is included in the URL.
 *
 * Upon component load, it checks the full URL path (including the fragment, i.e., the part after "#").
 * If the URL fragment equals `commentId`, the page is scrolled to the element with that `id`.
 *
 * It uses the `useEffect` hook to perform this logic upon component load.
 *
 * @component
 *
 * @param {Comment["id"]} commentId - The ID of the comment to which the page should scroll.
 *
 * @example
 * <NavigateToComment commentId="123abc" />
 *
 * @returns The component does not render any view, it only serves to scroll the page.
 */

export default function NavigateToComment({ commentId }: { commentId: Comment["id"] }) {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fullPath = window.location.href;
    const hash = fullPath.split("#")[1];

    if (hash && hash === commentId) {
      router.push(`${path}#${commentId}`);
    }
  }, [commentId, path, router]);

  return null;
}
