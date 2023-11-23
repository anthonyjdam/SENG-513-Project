import { useState } from "react";

const chooseActivityButtonColors = (activity: string) => {
  let background = "";
  let border = "";
  let circle = "";

  switch (activity) {
    case "Badminton":
      background = "bg-purple-900";
      border = "border-purple-500";
      circle = "bg-purple-500";
      break;
    case "Basketball":
      background = "bg-yellow-900";
      border = "border-yellow-500";
      circle = "bg-yellow-500";
      break;
    case "Ball Hockey":
      background = "bg-green-900";
      border = "border-green-500";
      circle = "bg-green-500";
      break;
    case "Volleyball":
      background = "bg-red-900";
      border = "border-red-500";
      circle = "bg-red-500";
      break;
    case "Soccer":
      background = "bg-orange-900";
      border = "border-orange-500";
      circle = "bg-orange-500";
      break;
    case "Open Gym":
      background = "bg-blue-900";
      border = "border-blue-500";
      circle = "bg-blue-500";
      break;
    default:
      break;
  }

  return { background, border, circle };
};

export const ActivityButton = ({ activity }: { activity: string }) => {
  //will probably need to lift state or use context at some point to render updates but that will be a later problem
  const [selected, setSelected] = useState(false);
  let { background, border, circle } = chooseActivityButtonColors(activity);

  return (
    <button
      type="button"
      className={`${
        selected ? background : "bg-none"
      } ${border} border-2 rounded-md py-2`}
      onClick={() => {
        selected ? setSelected(false) : setSelected(true);
      }}
    >
      <div className="flex flex-row items-center space-x-4 ml-4">
        <div className={`w-4 h-4 ${circle} rounded-full`}></div>
        <p className="text-sm">{activity}</p>
      </div>
    </button>
  );
};
