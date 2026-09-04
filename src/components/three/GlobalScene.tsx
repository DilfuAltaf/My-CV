"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { NeonEnvironment } from "./NeonEnvironment";
import { SceneController } from "./SceneController";

export function GlobalScene() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = mounted ? currentTheme === "dark" : true; 
  
  // Emerald for dark mode, Blue for light mode
  const orbColor = isDark ? "#10B981" : "#2563EB";

  return (
    <div className="fixed inset-0 w-full h-full z-0 opacity-100 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={isMobile ? 1 : [1, 1.2]} // Lowered max DPR to 1.2 for better performance
        gl={{ powerPreference: "high-performance", antialias: false }} // Optimized GL context
      >
        {/* Ambient Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color={orbColor} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color={"#ffffff"} />
        <pointLight position={[0, 0, 0]} intensity={2} color={orbColor} distance={20} />
        
        <NeonEnvironment color={orbColor} />

        {/* Lightweight Bloom */}
        {!isMobile && mounted && (
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={isDark ? 1.2 : 0.8} 
            />
          </EffectComposer>
        )}
      </Canvas>
      <SceneController />
    </div>
  );
}
