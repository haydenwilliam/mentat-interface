
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import ConfigurationModal from "./ConfigurationModal";
import { Bot, Settings } from "lucide-react";

const ModelConfiguration = () => {
  const [showConfigModal, setShowConfigModal] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Bot className="w-5 h-5 text-mentat-primary" />
        <h2 className="text-xl font-display font-semibold text-mentat-primary">Model Configuration</h2>
      </div>

      <Card className="relative p-6 bg-mentat-secondary/30 border-mentat-border">
        <div className="absolute inset-0 bg-gradient-to-r from-mentat-primary/5 to-transparent pointer-events-none" />
        <div className="relative space-y-6">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-mono text-mentat-primary/70">Temperature</p>
              <p className="font-display text-mentat-primary">0.7</p>
            </div>
            <div>
              <p className="text-sm font-mono text-mentat-primary/70">Context Length</p>
              <p className="font-display text-mentat-primary">8192 tokens</p>
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
