import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import ConfigurationModal from "./ConfigurationModal";
import { 
  Settings, 
  HelpCircle, 
  Cpu, 
  ThermometerSun, 
  PieChart,
  Edit3,
  ChevronRight
} from "lucide-react";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { typography, fontSizes } from "../../styles/fontSchema";

const ModelConfiguration = () => {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [outputLength, setOutputLength] = useState("1000");
  const [topP, setTopP] = useState(0.9);

  const handleOutputLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numValue = Math.min(Math.max(Number(value) || 100, 100), 4000);
    setOutputLength(numValue.toString());
  };

  return (
    <Card className="bg-mentat-background border-2 border-mentat-border/80 shadow-lg rounded-xl overflow-hidden">
      {/* Clean background without any accent elements that cause shadows */}
      <div className="relative p-6 z-10">
        <div className="space-y-6">
          {/* Current Model Section */}
          <div className="relative group hover:bg-mentat-primary/10 rounded-xl p-5 transition-all border border-mentat-border/40 bg-mentat-secondary/10 mentat-card mentat-content-padding">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md bg-mentat-primary/10 border border-mentat-primary/20 shadow-md">
                  <Cpu className="w-7 h-7 text-mentat-primary" />
                </div>
                <div>
                  <h3 className={typography.subsectionTitle}>Current Configuration</h3>
                  <p className="text-sm text-mentat-highlight line-clamp-2 mt-2">
                    GPT-4 Turbo (Default)
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowConfigModal(true)}
                className="min-w-[180px] bg-mentat-primary/10 hover:bg-mentat-primary/20 text-mentat-highlight border-2 border-mentat-primary/20 shadow-md flex justify-between items-center group"
                variant="outline"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-mentat-primary" />
                  <span className="text-sm">Manage Models</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-mentat-primary/70 group-hover:text-mentat-primary transition-all transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>

          {/* Advanced Settings Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temperature Setting */}
            <div className="relative group hover:bg-mentat-primary/10 rounded-xl p-5 transition-all border border-mentat-border/40 bg-mentat-secondary/10 flex flex-col h-full mentat-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-mentat-primary/10 border border-mentat-primary/20 shadow-md">
                    <ThermometerSun className="w-5 h-5 text-mentat-primary" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Label className="text-base font-medium text-mentat-highlight">Temperature</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-mentat-primary hover:text-mentat-primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="z-50">
                          <p className="text-sm">Controls the randomness in the AI's responses. Lower values (0-0.7) produce more consistent, focused results. Higher values (0.7-2.0) introduce more variety and creativity.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <span className="font-mono text-mentat-highlight text-lg">{temperature}</span>
              </div>

              <div className="mt-6 flex-1 flex flex-col justify-center">
                <Slider
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 text-xs md:text-sm text-mentat-highlight font-mono">
                  <span>More focused</span>
                  <span>More creative</span>
                </div>
              </div>
            </div>

            {/* Top P Setting */}
            <div className="relative group hover:bg-mentat-primary/10 rounded-xl p-5 transition-all border border-mentat-border/40 bg-mentat-secondary/10 flex flex-col h-full mentat-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-mentat-primary/10 border border-mentat-primary/20 shadow-md">
                    <PieChart className="w-5 h-5 text-mentat-primary" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Label className="text-base font-medium text-mentat-highlight">Top P</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-mentat-primary hover:text-mentat-primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="z-50">
                          <p className="text-sm">Determines the range of words the AI considers when generating text. Lower values make responses more deterministic, while higher values (closer to 1.0) allow for more diverse word choices.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <span className="font-mono text-mentat-highlight text-lg">{topP}</span>
              </div>

              <div className="mt-6 flex-1 flex flex-col justify-center">
                <Slider
                  value={[topP]}
                  onValueChange={(value) => setTopP(value[0])}
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 text-xs md:text-sm text-mentat-highlight font-mono">
                  <span>More focused</span>
                  <span>More diverse</span>
                </div>
              </div>
            </div>

            {/* Output Length Setting */}
            <div className="md:col-span-2 relative group hover:bg-mentat-primary/10 rounded-xl p-5 transition-all border border-mentat-border/40 bg-mentat-secondary/10 mentat-card">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-mentat-primary/10 border border-mentat-primary/20 shadow-md">
                    <Edit3 className="w-5 h-5 text-mentat-primary" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Label className="text-base font-medium text-mentat-highlight">Output Length (tokens)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-mentat-primary hover:text-mentat-primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="z-50">
                          <p className="text-sm">Limits the maximum length of AI responses. Higher values allow for more comprehensive answers, while lower values produce more concise responses. One token represents approximately 3/4 of a word.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <Input
                  type="text"
                  value={outputLength}
                  onChange={handleOutputLengthChange}
                  className="w-28 text-center font-mono bg-mentat-background border-2 border-mentat-primary/20 text-mentat-highlight focus:border-mentat-primary/40 focus:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfigurationModal open={showConfigModal} onOpenChange={setShowConfigModal} />
    </Card>
  );
};

export default ModelConfiguration;

