import { TbUser, TbClipboardCheck, TbSparkles } from "react-icons/tb";

export const USER_NAV_ITEMS = [
  { label: "My profile", icon: <TbUser />, to: "/profile" },
  { label: "My planner", icon: <TbClipboardCheck />, to: "/planner" },
  { label: "Retake assessment", icon: <TbSparkles />, to: "/assessment" },
];
