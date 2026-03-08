"use client";

import { useEffect, useRef } from "react";

type GodotReadyMessage = { godot_client_ready?: boolean };

function isGodotReadyMessage(value: unknown): value is GodotReadyMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "godot_client_ready" in value &&
    typeof (value as { godot_client_ready?: unknown }).godot_client_ready ===
      "boolean"
  );
}

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
    const sendInfoToGame = () => {
      const target = iframeRef.current?.contentWindow;
      if (!target) {
        console.warn("Godot iframe not ready to receive messages");
        return;
      }
      target.postMessage(info, "*");
    };

    const handleGodotReady = (event: MessageEvent<unknown>) => {
      const data = event.data;
      if (typeof data === "string") {
        try {
          const parsed = JSON.parse(data) as unknown;
          if (isGodotReadyMessage(parsed) && parsed.godot_client_ready) {
            console.log("Sent web info");
            sendInfoToGame();
          }
        } catch (error) {
          console.error("Failed to parse Godot message", error);
        }
      } else if (isGodotReadyMessage(data) && data.godot_client_ready) {
        // Structured clone already parsed by browser
        console.log("Sent web info");
        sendInfoToGame();
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
