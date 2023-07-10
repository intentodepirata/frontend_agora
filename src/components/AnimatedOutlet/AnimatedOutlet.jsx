import { useState } from "react";
import { useOutlet } from "react-router-dom";

export function AnimatedOutlet() {
  const [outlet] = useState(useOutlet());
  return outlet;
}
