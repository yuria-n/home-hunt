import { LeftPanel } from "@/app/left-panel";
import { HomeContent } from "@/app/home-content";

export default function Home() {
  return (
    <div className="relative h-[calc(100vh-3rem)]">
      <LeftPanel />
      <HomeContent />
    </div>
  );
}
