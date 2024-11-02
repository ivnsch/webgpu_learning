import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { init } from "./init";

export default function Home() {
  const [gpuSupported, setGpuSupported] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setGpuSupported(!!navigator.gpu);
    const nested = async () => {
      await init(canvasRef.current);
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
          <canvas
            id="gfx-main"
            width="800"
            height="600"
            ref={canvasRef}
          ></canvas>
        </div>
      </main>
    </div>
  );
}
