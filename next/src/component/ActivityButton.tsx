import { ActivityTogglesState, useActivityToggleStore } from "@/store";

const chooseActivityButtonColors = (activity: string) => {
  let background = "";
  let border = "";
  let circle = "";
  let hoverBackground = "";
  let emoji = "";
  let selectedBackground = "";

  switch (activity) {
    case "Badminton":
      hoverBackground = "hover:bg-purple-900";
      border = "border-purple-500";
      circle = "bg-purple-500";
      background = "bg-purple-500/10";
      selectedBackground = "bg-purple-500/75";
      emoji = "🏸";
      break;
    case "Basketball":
      hoverBackground = "hover:bg-amber-900";
      border = "border-amber-500";
      circle = "bg-amber-500";
      background = "bg-amber-500/10";
      selectedBackground = "bg-amber-500/75";
      emoji = "🏀";
      break;
    case "Ball Hockey":
      hoverBackground = "hover:bg-blue-900";
      border = "border-blue-500";
      circle = "bg-blue-500";
      background = "bg-blue-500/10";
      selectedBackground = "bg-blue-500/75";
      emoji = "🏑";
      break;
    case "Volleyball":
      hoverBackground = "hover:bg-red-900";
      border = "border-red-500";
      circle = "bg-red-500";
      background = "bg-red-500/10";
      selectedBackground = "bg-red-500/75";
      emoji = "🏐";
      break;
    case "Soccer":
      hoverBackground = "hover:bg-emerald-900";
      border = "border-emerald-500";
      circle = "bg-emerald-500";
      background = "bg-emerald-500/10";
      selectedBackground = "bg-emerald-500/75";
      emoji = "⚽";
      break;
    case "Open Gym":
      hoverBackground = "hover:bg-sky-900";
      border = "border-sky-500";
      circle = "bg-sky-500";
      background = "bg-sky-500/10";
      selectedBackground = "bg-sky-500/75";
      emoji = "🏃";
      break;
    default:
      break;
  }

  return {
    background,
    border,
    circle,
    hoverBackground,
    selectedBackground,
    emoji,
  };
};

export const ActivityButton = ({ activity }: { activity: string }) => {
  const { Toggles, setActivityToggles } = useActivityToggleStore();

  function isKeyOfToggles(
    key: string | number | symbol
  ): key is keyof ActivityTogglesState["Toggles"] {
    return key in Toggles;
  }

  const parsedActivity = activity.replace(
    " ",
    ""
  ) as keyof ActivityTogglesState["Toggles"];
  let isSelected;
  if (isKeyOfToggles(parsedActivity)) {
    isSelected = Toggles[parsedActivity];
  }

  let { background, circle, hoverBackground, selectedBackground, emoji } =
    chooseActivityButtonColors(activity);

  const buttonClasses = `${background} rounded-lg py-2 transition-colors duration-150 relative overflow-hidden ${
    isSelected ? selectedBackground : `bg-none ${hoverBackground}`
  } emoji-hover-animate`;

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={() => {
        setActivityToggles(
          activity.replace(" ", "") as keyof ActivityTogglesState["Toggles"]
        );
      }}
    >
      <div className="flex flex-row items-center space-x-4 ml-4">
        <div className={`w-4 h-4 ${circle} rounded-full`}></div>
        <p className="text-sm">{activity}</p>
        <span
          className={`absolute emoji ${isSelected ? "emoji-selected" : ""}`}
        >
          {emoji}
        </span>
      </div>
    </button>
  );
};
