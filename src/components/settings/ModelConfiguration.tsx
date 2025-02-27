
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";
import ConfigurationModal from "./ConfigurationModal";
import { Bot, Settings } from "lucide-react";
import { Label } from "../ui/label";

const ModelConfiguration = () => {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [outputLength, setOutputLength] = useState(1000);
  const [contextLength, setContextLength] = useState(8192);

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

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-mono text-mentat-primary/70">Temperature</Label>
                <span className="text-sm font-mono text-mentat-primary">{temperature}</span>
              </div>
              <Slider
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
                min={0}
                max={2}
                step={0.1}
                className="[&_[role=slider]]:bg-mentat-highlight [&_[role=slider]]:border-mentat-highlight"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-mono text-mentat-primary/70">Output Length</Label>
                <span className="text-sm font-mono text-mentat-primary">{outputLength} tokens</span>
              </div>
              <Slider
                value={[outputLength]}
                onValueChange={(value) => setOutputLength(value[0])}
                min={100}
                max={4000}
                step={100}
                className="[&_[role=slider]]:bg-mentat-highlight [&_[role=slider]]:border-mentat-highlight"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-mono text-mentat-primary/70">Context Length</Label>
                <span className="text-sm font-mono text-mentat-primary">{contextLength} tokens</span>
              </div>
              <Slider
                value={[contextLength]}
                onValueChange={(value) => setContextLength(value[0])}
                min={1000}
                max={32000}
                step={1000}
                className="[&_[role=slider]]:bg-mentat-highlight [&_[role=slider]]:border-mentat-highlight"
              />
            </div>
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
