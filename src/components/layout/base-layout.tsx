export default function BaseLayout({ children }: React.PropsWithChildren) {
  return <div className="h-full w-full flex flex-col">{children}</div>;
}
