
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
        {level > 0 && (
          <div 
            className="absolute left-3 top-0 bottom-0 w-px bg-mentat-border/20"
            style={{ transform: `translateX(${(level - 1) * 16}px)` }}
          />
        )}
        
        <button
          onClick={() => handleItemClick(fullPath, isFolder)}
          className={`
            w-full flex items-center gap-2 p-1.5 rounded-sm transition-all duration-200
            relative pl-${level * 4 + 4}
            ${isSelected ? 'bg-mentat-secondary/40' : 'hover:bg-mentat-secondary/20'}
            ${isCurrent ? 'text-mentat-highlight' : 'text-mentat-primary/80'}
            group
          `}
        >
          {isFolder && (
            <span onClick={(e) => { e.stopPropagation(); toggleFolder(name); }} className="flex items-center">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-mentat-primary/60" />
              ) : (
                <ChevronRight className="w-4 h-4 text-mentat-primary/60" />
              )}
            </span>
          )}
          {isFolder ? (
            <Folder className={`w-4 h-4 ${isCurrent ? 'text-mentat-highlight' : 'text-mentat-primary/60'}`} />
          ) : (
            <File className="w-4 h-4 text-mentat-primary/60" />
          )}
          <span className={`text-sm transition-colors duration-200 ${isCurrent ? 'text-mentat-highlight' : 'text-mentat-primary/80'} group-hover:text-mentat-primary`}>
            {name}
          </span>
        </button>

        {isFolder && isExpanded && (
          <div className={`transition-all duration-200 ${isExpanded ? 'animate-accordion-down' : 'animate-accordion-up'}`}>
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
    <div className="w-64 bg-mentat-secondary/20 border-l border-mentat-border p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-mentat-highlight/80 text-sm">File System</h3>
      </div>

      <div className="space-y-0.5">
        {Object.entries(mockFiles).map(([folder]) => renderItem(folder, true))}
      </div>
    </div>
  );
};

export default FileExplorer;
