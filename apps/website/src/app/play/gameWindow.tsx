"use client";

import { useEffect, useRef } from "react";

interface GameWindowProps {
  src: string;
  info: {
    username: string;
    avatar: string;
  };
}

export default function GameWindow({ src, info }: GameWindowProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleGodotReady = (event: MessageEvent) => {
      const data = event.data;
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.godot_client_ready) {
          console.log("Sent web info");
          iframeRef.current?.contentWindow?.postMessage(info, "*");
        }
      }
    };

    window.addEventListener("message", handleGodotReady);
    return () => {
      window.removeEventListener("message", handleGodotReady);
    };
  }, [info]);

  return (
    <iframe
      ref={iframeRef}
      className="w-screen h-screen block"
      loading="eager"
      src={src}
    />
  );
}
