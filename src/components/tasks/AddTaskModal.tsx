import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";

export default function AddTaskModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get("newTask");
  const show = !!modalTask;
  const params = useParams();
  const projectId = params.projectId!;

  const initialValues: TaskFormData = {
    name: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };

  return (
    <>
      <Transition show={show}>
        <div className="transition duration-700 ease-in data-[closed]:opacity-0">
          <Dialog
            open={show}
            onClose={() => navigate(location.pathname, { replace: true })}
            className="relative z-50"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className="w-1/4 space-y-4 border bg-white p-5 rounded-lg">
                <DialogTitle className="font-bold text-2xl">
                  New Task
                </DialogTitle>
                <Description>
                  Fill out the form and create {""}
                  <span className="text-red-500">a task</span>
                </Description>
                <form
                  className="mt-10 space-y-3"
                  onSubmit={handleSubmit(handleCreateTask)}
                  noValidate
                >
                  <TaskForm register={register} errors={errors} />
                  <input
                    type="submit"
                    value="Save Task"
                    className="bg-red-400 hover:bg-red-500 p-3 w-full text-white uppercase font-bold cursor-pointer transition-colors"
                  />
                </form>
              </DialogPanel>
            </div>
          </Dialog>
        </div>
      </Transition>
    </>
  );
}
