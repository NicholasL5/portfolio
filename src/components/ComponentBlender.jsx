export function ComponentBlender(){
  const blend = "20vh";  
  return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[20vh] h-[20vh] 
                   bg-gradient-to-b from-transparent to-neutral-900"
        style={{ top: `-${blend}`, height: blend }}
      />
    );
}