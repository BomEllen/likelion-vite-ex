function Container({ children }: { children: React.ReactElement }) {
  return (
    <div className="mx-auto my-10 sm:w-160 md:w-192 lg:w-256">{children}</div>
  );
}

export default Container;
