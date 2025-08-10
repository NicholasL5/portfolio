import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";

const PETAL_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
  <!-- white silhouette so we can tint with material color -->
  <path fill='#ffffff' d='M32 6c9 3 17 12 17 21c0 11-8 23-17 23S15 38 15 27c0-9 8-18 17-21z'/>
</svg>`);

function Petals({ count = 100 }) {
    const group = useRef();
    const map = useTexture(PETAL_SVG);
    map.flipY = false;
  
    const data = useMemo(() => {
      const arr = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: (Math.random() - 0.5) * 10,
          y: Math.random() * 6 - 2,
          z: (Math.random() - 0.5) * 6,
          rx: Math.random() * Math.PI,
          ry: Math.random() * Math.PI,
          s: Math.random() * 0.35 + 0.15,
          v: Math.random() * 0.003 + 0.0015,         // fall speed
          // 75% of petals get a subtle left drift
          windBias: Math.random() < 0.75 ? -(Math.random() * 0.003 + 0.001) : 0,
        });
      }
      return arr;
    }, [count]);
  
    useFrame((state, dt) => {
      const t = state.clock.getElapsedTime();
      const g = group.current;
      if (!g) return;
  
      g.children.forEach((m, i) => {
        const d = data[i];
        const speed = d.v * (dt * 60);
  
        // fall down
        m.position.y -= speed;
  
        // base gentle sway
        m.position.x += Math.sin(t * 0.5 + i * 0.3) * 0.0025 * (dt * 60);
        m.position.z += Math.cos(t * 0.2 + i) * 0.0008 * (dt * 60);
  
        // ✅ constant slight left drift for selected petals
        m.position.x += d.windBias * (dt * 60);
        if (d.windBias) m.rotation.z += -0.002 * (dt * 60); // tiny lean left
  
        // flutter
        m.rotation.x += 0.01;
        m.rotation.y += 0.008;
        m.rotation.z += 0.035 * Math.sin(t * 1.2 + i * 0.6);
  
        // recycle below screen
        if (m.position.y < -3.2) {
          m.position.y = 4 + Math.random();
          m.position.x = (Math.random() - 0.5) * 10;
          m.position.z = (Math.random() - 0.5) * 6;
        }
      });
    });
  
    return (
      <group ref={group}>
        {data.map((d, i) => (
          <mesh key={i} position={[d.x, d.y, d.z]} rotation={[d.rx, d.ry, 0]} scale={[d.s * 0.7, d.s * 1.15, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial map={map} transparent alphaTest={0.5} depthWrite={false} side={2} color="#D96C85" />
          </mesh>
        ))}
      </group>
    );
  }
  
  

export default function Hero3D() {
  return (
    <Canvas className="absolute inset-0" camera={{ position: [0, 0, 6], fov: 55 }}>
      <color attach="background" args={["#0B0C10"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1.1} />
      <Petals />
    </Canvas>
  );
}
