export default function DesireLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="m-6 my-8 flex flex-col">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        I need a sample desire, like this sample desire, like this
      </h2>
      {children}
    </div>
  );
}
