
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import ConfigurationModal from "./ConfigurationModal";
import { Bot, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "../ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

const ModelConfiguration = () => {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [outputLength, setOutputLength] = useState("1000");
  const [topP, setTopP] = useState(0.9);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleOutputLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const value = e.target.value.replace(/\D/g, '');
    // Ensure the value is between 100 and 4000
    const numValue = Math.min(Math.max(Number(value) || 100, 100), 4000);
    setOutputLength(numValue.toString());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 rounded-md bg-mentat-secondary/40">
          <Bot className="w-5 h-5 text-mentat-primary" />
        </div>
        <h2 className="text-xl font-display font-semibold text-mentat-primary">Model Configuration</h2>
      </div>

      <Card className="bg-mentat-secondary/20 border-mentat-border">
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-mentat-primary">Current Configuration</h3>
              <p className="text-sm font-mono text-mentat-primary/70">GPT-4 Turbo (Default)</p>
            </div>
            <Button
              onClick={() => setShowConfigModal(true)}
              className="bg-mentat-secondary hover:bg-mentat-secondary/80 text-mentat-primary border-mentat-border group"
              variant="outline"
            >
              <Settings className="w-4 h-4 mr-2 group-hover:text-mentat-highlight" />
              <span className="font-mono group-hover:text-mentat-highlight transition-colors">
                Manage Configurations
              </span>
            </Button>
          </div>

          <div className="space-y-4">
            <Collapsible
              open={isAdvancedOpen}
              onOpenChange={setIsAdvancedOpen}
              className="space-y-4"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-between items-center text-mentat-primary hover:text-mentat-highlight hover:bg-mentat-secondary/20 px-0"
                >
                  <span className="font-display text-lg">Advanced Settings</span>
                  {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-6">
                <div className="space-y-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-display text-mentat-primary/70">Output Length</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={outputLength}
                        onChange={handleOutputLengthChange}
                        className="w-24 text-right font-mono bg-mentat-secondary/20 border-mentat-border text-mentat-primary"
                      />
                      <span className="text-sm font-mono text-mentat-primary">tokens</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-display text-mentat-primary/70">Temperature</Label>
                    <span className="text-sm font-mono text-mentat-primary">{temperature}</span>
                  </div>
                  <Slider
                    value={[temperature]}
                    onValueChange={(value) => setTemperature(value[0])}
                    min={0}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-display text-mentat-primary/70">Top P</Label>
                    <span className="text-sm font-mono text-mentat-primary">{topP}</span>
                  </div>
                  <Slider
                    value={[topP]}
                    onValueChange={(value) => setTopP(value[0])}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </Card>

      <ConfigurationModal
        open={showConfigModal}
        onOpenChange={setShowConfigModal}
      />
    </div>
  );
};

export default ModelConfiguration;

