export default function GridSection({ columns = "lg:grid-cols-3", children, className = "" }) {
  return (
    <section className={`mt-6 grid gap-6 ${columns} ${className}`}
    >{children}</section>
  );
}

