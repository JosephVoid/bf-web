export default function Loader({ dark }: { dark?: boolean }) {
  return <span className={`loader ${dark ? `loader-dark` : ``}`}></span>;
}
