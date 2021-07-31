import { ReactComponent as Gryffindor } from "../../images/Gryffindor.svg";

export default function Login() {
  return (
    <div className="bg-primary w-full h-full flex flex-col items-center justify-evenly">
      <Gryffindor className="w-36 h-36" fill="#fff" />
      <p className="text-white text-sm tracking-wide">No password, no entry!</p>
      <button className="bg-secondary px-4 py-2 text-white text-sm font-bold tracking-widest rounded-full">
        Entry
      </button>
      <div>
        <p className="text-customGray text-xs">Don't remember your password?</p>
      </div>
    </div>
  );
}
