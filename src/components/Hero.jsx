import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col gap-5">
      <nav className="flex justify-between items-end w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/gawandeabhishek/aiSumz")}
          className="rounded-full text-lg px-4 py-0.5 bg-slate-900 text-center text-white hover:bg-transparent hover:text-slate-900 hover:border-slate-900 border-transparent border-[0.001rem]"
        >
          Github
        </button>
      </nav>

      <h1 className="text-center text-4xl font-bold">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-blue-950 to-blue-500 bg-clip-text text-transparent">
          OpenAI GPT-4
        </span>
      </h1>
      <h2 className="text-slate-500 md:mx-20 lg:mx-60 text-center mt-5">
        "Sumz" is a versatile and user-friendly transcription platform designed
        to simplify the process of converting audio and video content into text.
        With an intuitive interface and powerful transcription capabilities,
        Sumz empowers users to effortlessly transcribe interviews, lectures,
        meetings, podcasts, and more with exceptional accuracy and efficiency.
      </h2>
    </header>
  );
};

export default Hero;
