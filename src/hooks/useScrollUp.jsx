import { useEffect } from "react";

const useScrollUp = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    scrollToTop();
  }, []);
};

export default useScrollUp;
