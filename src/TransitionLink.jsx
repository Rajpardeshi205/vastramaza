"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TransitionLink({ href, children }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = (e) => {
    if (isTransitioning) return;

    e.preventDefault();
    setIsTransitioning(true);

    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 9999;
      transform: translateY(-100%);
      transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
      pointer-events: none;
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.transform = "translateY(0)";
    });

    setTimeout(() => {
      router.push(href);

      setTimeout(() => {
        overlay.style.transform = "translateY(-100%)";
        setTimeout(() => {
          overlay.remove();
          setIsTransitioning(false);
        }, 400);
      }, 100);
    }, 400);
  };

  return (
    <Link href={href} onClick={handleClick} prefetch={true}>
      {children}
    </Link>
  );
}
