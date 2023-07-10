import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  classGroups: {
    "font-size": [
      "text-body-small",
      "text-body-medium",
      "text-body-large",
      "text-label-small",
      "text-label-medium",
      "text-label-large",
      "text-title-small",
      "text-title-medium",
      "text-title-large",
    ],
  },
});
