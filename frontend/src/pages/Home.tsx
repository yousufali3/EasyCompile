// import "./bg/bg.css"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/compiler");
  };
  return (
    <div className="w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center flex-col gap-6 px-4">
      <h1 className="text-4xl md:text-7xl font-extrabold text-center leading-tight">
        Your Digital Playground for Web Development
      </h1>
      <p className="text-lg md:text-2xl text-center text-gray-400 max-w-3xl">
        Write, compile, and share your HTML, CSS, and JavaScript code
        effortlessly. Build stunning web projects, experiment with new ideas,
        and collaborate with your friends—all in one place!
      </p>
      <button
        onClick={handleButtonClick}
        className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-full shadow-lg transition-all duration-300 ease-in-out"
      >
        Try the Editor
      </button>
    </div>
  );
}
