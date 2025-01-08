import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamMember } from "../../types";
import { addUserToProject } from "../../api/TeamAPI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

export default function SearchResult({ user, reset }: SearchResultProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
      queryClient.invalidateQueries({
        queryKey: ["projectTeamMembers", projectId],
      });
    },
  });
  const handleAddUserToProject = () => {
    const data = {
      projectId,
      userId: user._id,
    };
    mutate(data);
  };
  return (
    <>
      <p className="mt-10 text-center font-bold">Result:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-red-600 hover:bg-red-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserToProject}
        >
          Add to project
        </button>
      </div>
    </>
  );
}
