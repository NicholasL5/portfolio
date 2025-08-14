export function SiteBackground() {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero.png")' }}
      />
      {/* same dark scrim you used in Hero */}
      <div className="fixed inset-0 -z-10 bg-black/25" />
    </>
  );
}
