import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 3800;

function useMicVolume(active) {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (!active) return;

    let ctx, analyser, src, data;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      ctx = new AudioContext();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      src = ctx.createMediaStreamSource(stream);
      src.connect(analyser);
      data = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        const peak = Math.max(...data) / 255;
        setVolume((avg / 255 + peak * 0.5) / 1.5);
        requestAnimationFrame(loop);
      };
      loop();
    });

    return () => ctx?.close();
  }, [active]);

  return volume;
}

function ParticleRing({ volume, recording }) {
  const group = useRef();
  const shell = useRef();

  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 1.5 + Math.random() * 0.3; // ~60% of previous "medium" size
      const a = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 0.6;
      arr.push(Math.cos(a) * r, Math.sin(a) * r, z);
    }
    return new Float32Array(arr);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const hue = (t * 40) % 360;
    const color = new THREE.Color(`hsl(${hue},100%,70%)`);

    const pulse = 1 + volume * (recording ? 0.25 : 0.15);
    group.current.scale.setScalar(pulse);

    group.current.rotation.y += recording ? 0.02 : 0.008;
    group.current.rotation.z = Math.sin(t * 0.5) * (recording ? 0.15 : 0.07);

    shell.current.rotation.x += recording ? 0.01 : 0.003;
    shell.current.material.emissive = color;
  });

  return (
    <group ref={group}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.5, 2]} /> {/* slightly smaller */}
        <meshStandardMaterial
          wireframe
          transparent
          opacity={0.12}
          emissiveIntensity={recording ? 2.2 : 1.2}
        />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.025} // smaller particles
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function DarkCore({ volume }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.scale.setScalar(1 + volume * 0.2); // slightly smaller pulse
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.0, 64, 64]} />{" "}
      {/* ~60% of previous medium size */}
      <meshStandardMaterial color="#000" transparent opacity={0.95} />
    </mesh>
  );
}

export default function AudioCircle3D({ recording = false }) {
  const volume = useMicVolume(recording);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }} // adjust camera for new size
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.6} />
      <pointLight position={[-4, -4, -4]} intensity={1.4} />

      <DarkCore volume={volume} />
      <ParticleRing volume={volume} recording={recording} />

      <EffectComposer>
        <Bloom
          intensity={recording ? 4.5 : 3.5}
          luminanceThreshold={0.06}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Canvas>
  );
}
