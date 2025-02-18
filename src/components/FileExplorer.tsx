
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FileSystemStructure {
  [key: string]: string[] | { [key: string]: string[] };
}

const mockFiles: FileSystemStructure = {
  projects: {
    'project-alpha': ['config.json', 'main.py', 'data.db'],
    'project-beta': ['settings.yml', 'index.js'],
  },
  documents: ['report.md', 'notes.txt'],
  system: ['logs.txt', 'backup.zip'],
};

interface FileExplorerProps {
  currentDirectory?: string;
  onDirectorySelect?: (path: string) => void;
}

const FileExplorer = ({ currentDirectory = '/projects/project-alpha', onDirectorySelect }: FileExplorerProps) => {
  const [expanded, setExpanded] = useState<string[]>(['projects']);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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

  const isCurrentDirectory = (path: string) => {
    return currentDirectory.includes(path);
  };

  const renderItem = (name: string, isFolder: boolean, parentPath = '', level = 0) => {
    const fullPath = `${parentPath}/${name}`;
    const isExpanded = expanded.includes(name);
    const isSelected = selectedItem === fullPath;
    const isCurrent = isCurrentDirectory(name);

    return (
      <div key={fullPath} className="relative">
        <div
          className={`
            relative flex items-center px-2 py-1.5 rounded-md
            transition-all duration-200 ease-in-out
            ${isSelected ? 'bg-mentat-primary/10 shadow-[0_0_10px_rgba(0,229,255,0.1)]' : 
              'hover:bg-mentat-secondary/30'}
            ${isCurrent ? 'border-l-2 border-mentat-highlight' : ''}
            ml-[${level * 16}px]
          `}
          onClick={() => handleItemClick(fullPath, isFolder)}
          style={{ marginLeft: `${level * 16}px` }}
        >
          <div className="flex items-center gap-2 min-w-[24px]">
            {isFolder && (
              <button
                onClick={(e) => { e.stopPropagation(); toggleFolder(name); }}
                className="p-1 rounded-md hover:bg-mentat-secondary/50 
                  transition-colors duration-200"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-mentat-primary" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-mentat-primary" />
                )}
              </button>
            )}
            {isFolder ? (
              <Folder className={`w-4 h-4 ${isCurrent ? 'text-mentat-highlight animate-pulse' : 'text-mentat-primary'}`} />
            ) : (
              <File className="w-4 h-4 text-mentat-primary/80" />
            )}
          </div>
          
          <span 
            className={`
              text-sm ml-1 transition-all duration-200
              ${isCurrent ? 'text-mentat-highlight font-medium' : 'text-mentat-primary/90'} 
              ${isSelected ? 'text-mentat-highlight' : ''}
            `}
          >
            {name}
          </span>
        </div>

        {isFolder && (
          <div 
            className={`
              overflow-hidden transition-all duration-200 ease-in-out
              ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
              relative
            `}
          >
            {/* Vertical line for nested items */}
            <div 
              className="absolute left-[7px] top-0 w-px bg-mentat-border/30 h-full"
              style={{ left: `${level * 16 + 11}px` }}
            />
            
            {(() => {
              const content = mockFiles[name];
              if (!content) return null;
              
              if (Array.isArray(content)) {
                return content.map(file => renderItem(file, false, fullPath, level + 1));
              } else {
                return Object.entries(content).map(([subFolder, files]) => (
                  <div key={subFolder}>
                    {renderItem(subFolder, true, fullPath, level + 1)}
                    {expanded.includes(subFolder) &&
                      files.map(file => renderItem(file, false, `${fullPath}/${subFolder}`, level + 2))}
                  </div>
                ));
              }
            })()}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-mentat-secondary/10 border-l border-mentat-border">
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-mentat-background/90 p-4 border-b border-mentat-border">
        <h3 className="text-mentat-highlight text-sm font-medium flex items-center gap-2">
          <Folder className="w-4 h-4" /> File System
        </h3>
      </div>

      <div className="p-2 space-y-1">
        {Object.entries(mockFiles).map(([folder]) => renderItem(folder, true))}
      </div>
    </div>
  );
};

export default FileExplorer;
