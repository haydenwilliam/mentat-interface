
import { useEffect, useState } from "react";
import SystemMonitor from "@/components/SystemMonitor";
import Terminal from "@/components/Terminal";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen p-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <header className="mb-8">
        <h1 className="text-4xl font-bold retro-text mb-2">MENTAT</h1>
        <p className="text-mentat-highlight/60">Advanced Computing Interface</p>
      </header>

      <main className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-4 retro-text">System Status</h2>
          <SystemMonitor />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 retro-text">Terminal Interface</h2>
          <Terminal />
        </section>
      </main>

      <div className="fixed top-0 left-0 w-full h-1 overflow-hidden pointer-events-none">
        <div className="w-full h-full bg-mentat-primary/10 animate-scan-line" />
      </div>
    </div>
  );
};

export default Index;
