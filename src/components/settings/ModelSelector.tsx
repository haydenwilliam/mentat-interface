
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface ModelSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModelSelector = ({ open, onOpenChange }: ModelSelectorProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Select Provider</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card 
            className="p-6 bg-mentat-secondary/10 border-mentat-border cursor-pointer hover:bg-mentat-secondary/20 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-mentat-primary mb-2">OpenRouter (Recommended)</h3>
                <p className="text-sm text-mentat-primary/70">
                  Access multiple AI models through a single API. Includes popular models like GPT-4, Claude, and more.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-mentat-primary/70" />
            </div>
          </Card>

          <Card 
            className="p-6 bg-mentat-secondary/10 border-mentat-border cursor-pointer hover:bg-mentat-secondary/20 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-mentat-primary mb-2">Custom Provider</h3>
                <p className="text-sm text-mentat-primary/70">
                  Connect to any OpenAI-compatible endpoint. Ideal for self-hosted models or custom deployments.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-mentat-primary/70" />
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelSelector;
