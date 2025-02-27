
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Plus, Terminal, Cpu } from "lucide-react";
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
      <DialogContent className="sm:max-w-xl bg-[#001A1D] border-mentat-border">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-display font-bold text-mentat-primary flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            Model Configurations
          </DialogTitle>
          <p className="text-sm text-mentat-primary/70 font-mono">
            Configure and manage your AI model presets
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          {configurations.map((config) => (
            <Card 
              key={config.id} 
              className="relative p-6 bg-mentat-secondary/30 border-mentat-border hover:bg-mentat-secondary/40 transition-colors group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-mentat-primary/5 to-transparent pointer-events-none" />
              <div className="relative flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-mentat-primary/70" />
                    <h3 className="font-display font-semibold text-mentat-primary group-hover:text-mentat-highlight transition-colors">
                      {config.name}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-mono text-mentat-primary/70">
                      Model: {config.model}
                    </p>
                    <div className="flex gap-4 text-xs font-mono text-mentat-primary/50">
                      <span>Temp: {config.temperature}</span>
                      <span>Context: {config.contextLength}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="hover:bg-mentat-secondary/50 hover:text-mentat-highlight"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          <Button
            className="w-full bg-mentat-secondary/30 border-dashed border-2 border-mentat-border hover:bg-mentat-secondary/40 hover:border-mentat-primary/50 transition-all group"
            variant="outline"
            onClick={() => setShowModelSelector(true)}
          >
            <Plus className="w-4 h-4 mr-2 group-hover:text-mentat-highlight" />
            <span className="font-mono text-sm">Add Configuration</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationModal;

