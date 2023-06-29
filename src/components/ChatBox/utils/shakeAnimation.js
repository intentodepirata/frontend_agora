import { keyframes } from "@emotion/react";

export const shakeAnimation = keyframes`
0% {
  transform: rotate(-20deg);
}
25% {
  transform: rotate(-10deg);
}
50% {
  transform: rotate(-20deg);
}
75% {
  transform: rotate(-10deg);
}
100% {
  transform: rotate(-20deg);
}
`;
