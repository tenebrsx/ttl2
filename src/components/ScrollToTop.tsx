import React from "react";
import { useScrollToTop } from "../hooks/useScrollToTop";

interface ScrollToTopProps {
  smooth?: boolean;
  delay?: number;
  enabled?: boolean;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  smooth = true,
  delay = 0,
  enabled = true,
}) => {
  useScrollToTop({ smooth, delay, enabled });
  return null;
};

export default ScrollToTop;
