import { Fragment } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { TaskProject } from "../../types";
import { deleteTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: TaskProject;
  canEdit: boolean;
};

export default function TaskCard({ task, canEdit }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
    });
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const projectId = params.projectId!;

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projectDetail", projectId] });
      toast.success(data);
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: isDragging ? "none" : "transform 0.2s ease",
    zIndex: isDragging ? 1000 : undefined,
    boxShadow: isDragging ? "0px 4px 12px rgba(0, 0, 0, 0.15)" : undefined,
    position: isDragging ? "relative" : undefined,
  } as React.CSSProperties;

  return (
    <li
      style={style}
      className="relative bg-white border border-slate-300 flex justify-between gap-3"
    >
      <div
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        className="w-full flex flex-col gap-y-4 p-5"
      >
        <button
          className="text-xl font-bold text-slate-600 text-left"
          onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
        >
          {task.name}
        </button>
        <p className="text-slate-500">{task.description}</p>
      </div>
      <div className="flex shrink-0  gap-x-6">
        <Menu as="div" className="relative flex-none">
          <MenuButton className="block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">options</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem>
                <button
                  type="button"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900"
                  onClick={() =>
                    navigate(location.pathname + `?viewTask=${task._id}`)
                  }
                >
                  Task detail
                </button>
              </MenuItem>
              {canEdit && (
                <>
                  <MenuItem>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-gray-900"
                      onClick={() =>
                        navigate(location.pathname + `?editTask=${task._id}`)
                      }
                    >
                      Edit task
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-red-500"
                      onClick={() => mutate({ projectId, taskId: task._id })}
                    >
                      Delete task
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}
