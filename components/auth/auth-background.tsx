export function AuthBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      <div
        className="absolute bottom-[-242px] left-[-87px] right-[-114px] h-[531px] md:bottom-[-945px] md:left-[-264px] md:right-[-664px] md:h-[2461px]"
        style={{
          background: "linear-gradient(270deg, #5613A3 38.99%, #522BC8 77.96%)",
          filter: "blur(32px)",
        }}
      />
      <div
        className="absolute bottom-[-141px] left-[-96px] right-[72px] h-[493px] rotate-45 md:bottom-[-653px] md:left-[-445px] md:right-[335px] md:h-[2286px]"
        style={{
          background:"linear-gradient(230.59deg, #AC88FF 33.13%, #AD3AE7 63.19%)", filter: "blur(32px)",
        }}
      />
    </div>
  );
}
