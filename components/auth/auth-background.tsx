export function AuthBackground() {
  return (
    <div className="absolute -z-10 inset-0 overflow-hidden bg-black">
      <div
        className="absolute bottom-[-40vh] left-[-15vw] h-[90vh] w-[80vw] md:bottom-[-60vh] md:left-[-20vw] md:h-[130vh] md:w-[70vw]"
        style={{
          background: "linear-gradient(270deg, #5613A3 38.99%, #522BC8 77.96%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-[-30vh] right-[-20vw] h-[80vh] w-[70vw] rotate-45 md:bottom-[-45vh] md:right-[-25vw] md:h-[120vh] md:w-[60vw]"
        style={{
          background:
            "linear-gradient(230.59deg, #AC88FF 33.13%, #AD3AE7 63.19%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
