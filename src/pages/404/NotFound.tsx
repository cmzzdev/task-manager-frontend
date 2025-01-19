import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-4xl text-white">Not found page</h1>
      <p className="text-white mt-5">
        Maybe want to return your{" "}
        <Link className="text-red-500" to={"/"}>
          Projects
        </Link>
      </p>
    </>
  );
}
