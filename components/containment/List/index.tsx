import React, { FC } from "react";

import { twMerge } from "@/utils/twMerge";

interface ListProps {
  title?: string;
  body?: string;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  className?: string;
}

/**
 * Lists are continuous, vertical indexes of text or images.
 * @param title The title of the list item.
 * @param body The body of the list item.
 * @param leftElement An optional element to render on the left side of the list item.
 * @param rightElement An optional element to render on the right side of the list item.
 */
export const List: FC<ListProps> = ({ title, body, leftElement, rightElement, className }) => (
  <div className={twMerge("flex w-full items-center gap-4 py-3 pl-4 pr-6", className)}>
    {leftElement}
    <div className="flex-1 overflow-hidden">
      <div className="truncate text-body-large text-on-surface">{title}</div>
      <div className="truncate text-body-medium text-on-surface-variant">{body}</div>
    </div>
    {rightElement}
  </div>
);
