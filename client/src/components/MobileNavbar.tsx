import { useNavigate } from "react-router-dom";

const MobileNavbar = () => {
  //  !!!!!!!!
  const user = JSON.parse(localStorage.getItem("user:details") ?? "null");
  const navigate = useNavigate();
  return (
    <main className="flex flex-col mb-2 p-4 md:mb-0 md:p-0 md:max-w-[41vw] md:pt-0 items-center gap-7 border-neutral-300 pb-0 sticky top-0 bg-white">
      <div className="flex flex-row items-center w-full">
        <div
          className="w-[38%]"
          onClick={() => {
            if (!user) {
              navigate("/user/signin");
            } else {
              navigate("/user/profile");
            }
          }}
        >
          <div className="w-8 h-8 relative">
            <img
              src={
                user?.profileImageUrl
                  ? user?.profileImageUrl
                  : "/placeholder.png"
              }
              className="w-full h-full object-cover object-center rounded-full md:hidden"
              alt="tweetopia logo"
            />
          </div>
        </div>
        <span className="font-playball font-bold text-2xl text-blue-400 md:hidden">
          TweeTopia
        </span>
      </div>
    </main>
  );
};

export default MobileNavbar;
