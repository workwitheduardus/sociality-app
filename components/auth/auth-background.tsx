export function AuthBackground() {
  return (
    <div className="absolute -z-10 inset-0 -z-10 h-screen w-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-bottom bg-no-repeat md:hidden"
        style={{ backgroundImage: "url(/layer-mobile.svg)" }}
      />
      <div
        className="absolute inset-0 hidden bg-bottom bg-no-repeat md:block"
        style={{ backgroundImage: "url(/layer-dekstop.svg)" }}
      />
    </div>
  );
}
