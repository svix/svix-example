export default function Container({ children }: React.PropsWithChildren) {
  return <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>;
}
