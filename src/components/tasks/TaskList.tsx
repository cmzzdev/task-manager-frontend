import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Project, TaskProject, TaskStatus } from "../../types";
import { statusDictionary } from "../../utils/taskStatus";
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateStatus } from "../../api/TaskAPI";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

type GroupedTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["projectDetail", projectId] });
    },
  });

  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;

    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;

      queryClient.setQueryData(
        ["projectDetail", projectId],
        (prevData: Project) => {
          const updatedTasks = prevData.tasks.map((task) => {
            if (task._id === taskId && task.status !== status) {
              mutate({ projectId, taskId, status });
              return {
                ...task,
                status,
              };
            }
            return task;
          });
          return {
            ...prevData,
            tasks: updatedTasks,
          };
        }
      );
    }
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tasks</h2>
      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusDictionary[status].color}`}
              >
                {statusDictionary[status].value}
              </h3>
              <DropTask status={status}>
                <ul className="mt-2 space-y-5">
                  {tasks.length === 0 ? (
                    <li className="text-gray-500 text-center pt-3">
                      No tasks yet
                    </li>
                  ) : (
                    tasks.map((task) => (
                      <TaskCard key={task._id} task={task} canEdit={canEdit} />
                    ))
                  )}
                </ul>
              </DropTask>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
