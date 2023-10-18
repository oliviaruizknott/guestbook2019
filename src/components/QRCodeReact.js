import React, { useEffect, useRef } from "react";
import QRCode from "../vendor/qrcode_.min";

const QRCodeReact = ({ link }) => {
  const canvas = useRef(null);

  useEffect(() => {
    let options = {
      errorCorrectionLevel: "L", // L, M, Q, H
      margin: 0,
      scale: 3, // pixels per square
      // width: 100, // overides `scale`
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    };

    const setQRCode = async () => {
      await QRCode.toCanvas(canvas.current, link, options);
    };
    setQRCode();
  }, [link, canvas]);

  return (
    <div style={{ marginBlock: "1rem" }}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <canvas ref={canvas}></canvas>
      </a>
    </div>
  );
};

export default QRCodeReact;
