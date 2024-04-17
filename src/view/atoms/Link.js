export default function Link({ href, children, sx }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" sx={sx}>
      {children}
    </a>
  );
}
