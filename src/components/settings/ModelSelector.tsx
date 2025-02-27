
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Terminal } from "lucide-react";

interface ModelSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModelSelector = ({ open, onOpenChange }: ModelSelectorProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-[#001A1D] border-mentat-border">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-display font-bold text-mentat-primary flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            Select Provider
          </DialogTitle>
          <p className="text-sm text-mentat-primary/70 font-mono">
            Choose an AI model provider to configure
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card 
            className="relative p-6 bg-mentat-secondary/30 border-mentat-border hover:bg-mentat-secondary/40 transition-colors group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-mentat-primary/5 to-transparent pointer-events-none" />
            <div className="relative flex justify-between items-center">
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-mentat-primary group-hover:text-mentat-highlight transition-colors">
                  OpenRouter (Recommended)
                </h3>
                <p className="text-sm font-mono text-mentat-primary/70">
                  Access multiple AI models through a single API. Includes popular models like GPT-4, Claude, and more.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-mentat-primary/70 group-hover:text-mentat-highlight transition-colors" />
            </div>
          </Card>

          <Card 
            className="relative p-6 bg-mentat-secondary/30 border-mentat-border hover:bg-mentat-secondary/40 transition-colors group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-mentat-primary/5 to-transparent pointer-events-none" />
            <div className="relative flex justify-between items-center">
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-mentat-primary group-hover:text-mentat-highlight transition-colors">
                  Custom Provider
                </h3>
                <p className="text-sm font-mono text-mentat-primary/70">
                  Connect to any OpenAI-compatible endpoint. Ideal for self-hosted models or custom deployments.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-mentat-primary/70 group-hover:text-mentat-highlight transition-colors" />
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelSelector;
