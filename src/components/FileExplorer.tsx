
import { FolderTree, Search } from "lucide-react";
import { useState } from "react";
import { FileExplorerProps, mockFiles } from "./file-explorer/types";
import { filterItems } from "./file-explorer/utils";
import FileExplorerItem from "./file-explorer/FileExplorerItem";

const FileExplorer = ({ currentDirectory = '', onDirectorySelect, onAddToContext }: FileExplorerProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFolder = (folder: string) => {
    setExpanded(prev => 
      prev.includes(folder)
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };

  const handleItemClick = (path: string, isFolder: boolean) => {
    setSelectedItem(path);
    if (isFolder && onDirectorySelect) {
      onDirectorySelect(path);
    }
  };

  const handleAddToContext = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    if (onAddToContext) {
      onAddToContext(path);
    }
  };

  const isCurrentDirectory = (path: string) => {
    return currentDirectory.includes(path);
  };

  const filteredFiles = filterItems(mockFiles, searchQuery);

  return (
    <div className="h-full w-64 bg-mentat-secondary/10 border-l border-mentat-border flex flex-col">
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-mentat-background/90 px-3 py-2.5 border-b border-mentat-border">
        <h3 className="text-mentat-highlight text-sm font-medium flex items-center justify-center gap-2 mb-2">
          <FolderTree className="w-4 h-4" /> File Explorer
        </h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-mentat-secondary/30 border border-mentat-border/50 rounded-md 
              px-8 py-1.5 text-sm text-mentat-accent placeholder:text-mentat-accent/40
              focus:outline-none focus:ring-1 focus:ring-mentat-highlight/50"
          />
          <Search className="w-4 h-4 text-mentat-accent/40 absolute left-2 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="flex-1 p-2 space-y-1 overflow-y-auto">
        {Object.entries(filteredFiles).map(([folder, content]) => (
          <FileExplorerItem
            key={folder}
            name={folder}
            isFolder={true}
            isExpanded={expanded.includes(folder)}
            isSelected={selectedItem === `/${folder}`}
            isCurrent={isCurrentDirectory(folder)}
            level={0}
            parentPath=""
            content={content}
            expanded={expanded}
            onToggleFolder={toggleFolder}
            onItemClick={handleItemClick}
            onAddToContext={handleAddToContext}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
