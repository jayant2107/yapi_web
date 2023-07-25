import React from "react";

export default function SHA256() {
  const checkingHex = async (message) => {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log(hashHex , "hashHEX");
    return hashHex;
  };

  checkingHex("8a4501dcb501738d5860f0801fa5f7ba994327d9fcf17f4f443cb9cabc836711");

  return <div>SHA256</div>;
}
