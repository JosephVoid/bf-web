import { Desire } from "./desire-list";

export default function UserDesireList() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-medium mb-3">Posted Desires</h2>
      {Array.from({ length: 2 }).map((_, index) => (
        <Desire key={index} />
      ))}
    </div>
  );
}
