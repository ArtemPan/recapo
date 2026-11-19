"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { DemoPlaceholder } from "./demo-placeholder";

const Demo = dynamic(() => import("./demo").then((module) => module.Demo), {
  ssr: false,
  loading: () => <DemoPlaceholder />,
});

export function LazyDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{visible ? <Demo /> : <DemoPlaceholder />}</div>;
}
