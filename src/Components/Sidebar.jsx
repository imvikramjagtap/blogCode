export default function Sidebar() {
  return (
    <div className="w-[30%] p-5 border mt-5 mr rounded mr-5 h-fit">
      <h1 className="text-2xl font-serif">About Me</h1>
      <div className="flex justify-left gap-10 items-center mt-5">
        <img
          className="h-20 w-20 rounded-full"
          src="https://vikramjagtap.netlify.app/static/media/profile-img.3bbf5ec9c2bb33f3f308.JPG"
          alt=""
        />
        <div>
          <p className="font-semibold">Vikram Jagtap</p>
          <p className="text-blue-600">Front End Developer</p>
        </div>
      </div>
      <p className="mt-5">
        Fueled by high energy levels and boundless enthusiasm, I’m easily
        inspired and more then willing to follow my fascinations wherever they
        take me. I’m passionate, expressive, multi-talented spirit with a
        natural ability to entertain and inspire. I’m never satisfied to just
        come up with ideas. Instead I have an almost impulsive need to act on
        them.
      </p>
      <div className="flex items-center justify-end mt-5">
        <a
          target="_blank"
          href="https://vikramjagtap.netlify.app/"
          className="border border-blue-500 rounded px-3 py-1 hover:bg-blue-500 hover:text-white"
        >
          More about me
        </a>
      </div>
    </div>
  );
}
