
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Plus } from "lucide-react";
import ModelSelector from "./ModelSelector";

interface ConfigurationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfigurationModal = ({ open, onOpenChange }: ConfigurationModalProps) => {
  const [showModelSelector, setShowModelSelector] = useState(false);

  // Mock configurations
  const configurations = [
    {
      id: 1,
      name: "Default GPT-4",
      model: "gpt-4-turbo",
      provider: "openrouter",
      temperature: 0.7,
      contextLength: 8192,
    },
    {
      id: 2,
      name: "Creative Assistant",
      model: "claude-2",
      provider: "openrouter",
      temperature: 0.9,
      contextLength: 100000,
    },
  ];

  if (showModelSelector) {
    return (
      <ModelSelector
        open={open}
        onOpenChange={(value) => {
          onOpenChange(value);
          if (!value) setShowModelSelector(false);
        }}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Model Configurations</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {configurations.map((config) => (
            <Card key={config.id} className="p-4 bg-mentat-secondary/10 border-mentat-border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-mentat-primary">{config.name}</h3>
                  <p className="text-sm text-mentat-primary/70">{config.model}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setShowModelSelector(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationModal;
