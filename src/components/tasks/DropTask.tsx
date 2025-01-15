import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
  status: string;
  children: React.ReactNode;
};

export default function DropTask({ status, children }: DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const style = {
    opacity: isOver ? 0.4 : undefined,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500  mt-5 grid text-slate-500"
    >
      <div className="text-center">Drop task here</div>
      <div>{children}</div>
    </div>
  );
}
