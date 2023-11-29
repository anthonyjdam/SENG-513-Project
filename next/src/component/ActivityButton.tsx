import { useContext } from "react";
import { ToggleContext } from "@/app/page";

const chooseActivityButtonColors = (activity: string) => {
  let background = "";
  let border = "";
  let circle = "";
  let hoverBackground = "";
  let emoji = "";

  switch (activity) {
    case "Badminton":
      background = "bg-purple-900";
      border = "border-purple-500";
      circle = "bg-purple-500";
      hoverBackground = "hover:bg-purple-500/25";
      emoji = "🏸";
      break;
    case "Basketball":
      background = "bg-yellow-900";
      border = "border-yellow-500";
      circle = "bg-yellow-500";
      hoverBackground = "hover:bg-yellow-500/25";
      emoji = "🏀";
      break;
    case "Ball Hockey":
      background = "bg-green-900";
      border = "border-green-500";
      circle = "bg-green-500";
      hoverBackground = "hover:bg-green-500/25";
      emoji = "🏑";
      break;
    case "Volleyball":
      background = "bg-red-900";
      border = "border-red-500";
      circle = "bg-red-500";
      hoverBackground = "hover:bg-red-500/25";
      emoji = "🏐";
      break;
    case "Soccer":
      background = "bg-orange-900";
      border = "border-orange-500";
      circle = "bg-orange-500";
      hoverBackground = "hover:bg-orange-500/25";
      emoji = "⚽";
      break;
    case "Open Gym":
      background = "bg-blue-900";
      border = "border-blue-500";
      circle = "bg-blue-500";
      hoverBackground = "hover:bg-blue-500/25";
      emoji = "🏃‍♂️";
      break;
    default:
      break;
  }

  return { background, border, circle, hoverBackground, emoji };
};

export const ActivityButton = ({ activity }: { activity: string }) => {
  //will probably need to lift state or use context at some point to render updates but that will be a later problem
  const { activityToggles, setActivityToggles } = useContext(ToggleContext);
  const isSelected = activityToggles[activity];

  let { background, border, circle, hoverBackground, emoji } = chooseActivityButtonColors(activity);

  const buttonClasses = `${border} border-2 rounded-md py-2 transition-colors duration-150 relative overflow-hidden ${isSelected ? background : `bg-none ${hoverBackground}`
    } emoji-hover-animate`;


  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={() => {
        setActivityToggles((prevState) => ({
          ...prevState,
          [activity]: !prevState[activity],
        }));
      }}
    >
      <div className="flex flex-row items-center space-x-4 ml-4">
        <div className={`w-4 h-4 ${circle} rounded-full`}></div>
        <p className="text-sm">{activity}</p>
        <span className={`absolute emoji ${isSelected ? 'emoji-selected' : ''}`}>{emoji}</span>
      </div>
    </button>
  );
};
