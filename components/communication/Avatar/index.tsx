import React, { FC } from "react";
import { MdPerson } from "react-icons/md";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { Badge } from "../Badge";

interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg";
  ring?: "primary" | "secondary";
  src?: string;
  badgeText?: string;
  className?: string;
}

/**
 * Avatars are used to represent a user or entity. They can be used with or without an image.
 * @param size The size of the avatar.
 * @param ring The color of the ring around the avatar.
 * @param src The source URL of the image to display.
 * @param badgeText The text to display in the badge.
 */
export const Avatar: FC<AvatarProps> = ({ size = "md", ring, src, badgeText }) => {
  const getSizeStyles = () => {
    switch (size) {
      case "xs":
        return "h-8";
      case "sm":
        return "h-10";
      case "md":
        return "h-12";
      case "lg":
        return "h-16";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "xs":
        return 12;
      case "sm":
        return 16;
      case "md":
        return 20;
      case "lg":
        return 24;
    }
  };

  const getRingStyles = () => {
    switch (ring) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "animate-spin-slow animation bg-gradient-to-r from-green-500 via-blue-500 to-purple-500";
    }
  };

  const InnerAvatar: FC = () => (
    <div className={`absolute z-10 ${!ring ? "inset-0" : "inset-1"}`}>
      <AvatarPrimitive.Image className="rounded-full" src={src} />
      <AvatarPrimitive.Fallback
        className={`flex h-full w-full items-center justify-center overflow-hidden overflow-ellipsis rounded-full bg-surface-container-low p-1 text-center text-label-medium text-on-surface ${
          size === "sm" ? "uppercase" : "capitalize"
        }`}
      >
        <MdPerson size={getIconSize()} />
      </AvatarPrimitive.Fallback>
    </div>
  );

  return (
    <AvatarPrimitive.Root className={`relative flex aspect-square ${getSizeStyles()}`}>
      {badgeText && (
        <div className="absolute -right-0.5 -top-0.5 z-20">
          <Badge>{badgeText}</Badge>
        </div>
      )}
      {ring ? (
        <>
          <InnerAvatar />
          <div className={`absolute inset-0 rounded-full p-0.5 ${getRingStyles()}`}>
            <div className="absolute inset-0.5 rounded-full bg-background" />
          </div>
        </>
      ) : (
        <InnerAvatar />
      )}
    </AvatarPrimitive.Root>
  );
};
