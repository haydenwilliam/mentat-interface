
import React, { useState } from "react";
import { ChevronRight, Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import ConfigurationModal from "./ConfigurationModal";

const ModelConfiguration = () => {
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Mock current configuration
  const currentConfig = {
    name: "Default GPT-4",
    model: "gpt-4-turbo",
    provider: "openrouter",
    temperature: 0.7,
    contextLength: 8192,
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-semibold text-mentat-primary">Model Configuration</h2>
      
      {/* Current Configuration Card */}
      <Card className="p-6 bg-mentat-secondary/10 border-mentat-border">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-mentat-primary">{currentConfig.name}</h3>
              <p className="text-sm text-mentat-primary/70">{currentConfig.model}</p>
            </div>
            <Button variant="outline" onClick={() => setShowConfigModal(true)}>
              Change Configuration
            </Button>
          </div>
          
          {/* Parameters */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-mentat-primary/70">Temperature</p>
              <p className="text-mentat-primary">{currentConfig.temperature}</p>
            </div>
            <div>
              <p className="text-sm text-mentat-primary/70">Context Length</p>
              <p className="text-mentat-primary">{currentConfig.contextLength}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Configuration Modal */}
      <ConfigurationModal
        open={showConfigModal}
        onOpenChange={setShowConfigModal}
      />
    </div>
  );
};

export default ModelConfiguration;
