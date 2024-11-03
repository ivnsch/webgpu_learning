import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { Renderer } from "./renderer";
import { Scene } from "./scene";

export default function Home() {
  const [gpuSupported, setGpuSupported] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const nested = async () => {
      const sphereCount = 8192;
      const scene = new Scene(sphereCount);
      const renderer = new Renderer(canvasRef.current, scene);
      await renderer.Initialize();
      renderer.render();
    };
    nested();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div id="compatibility-check">
          {/* {gpuSupported ? (
            <div>Gpu is supported!</div>
          ) : (
            <div>Gpu is not supported!</div>
          )} */}

          <canvas width="800" height="600" ref={canvasRef}></canvas>
        </div>
      </main>
    </div>
  );
}
