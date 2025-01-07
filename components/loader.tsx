export default function Loader({
  dark,
  large,
}: {
  dark?: boolean;
  large?: boolean;
}) {
  return (
    <span
      className={`loader ${large ? `loader-large` : ``} ${
        dark ? `loader-dark` : ``
      }`}
    ></span>
  );
}
