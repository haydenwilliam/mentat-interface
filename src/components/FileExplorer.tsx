
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
        {/* Indentation guides */}
        {level > 0 && Array.from({ length: level }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-mentat-border/20"
            style={{
              left: `${(i + 1) * 16 - 8}px`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
        
        <div
          className={`
            relative flex items-center gap-2 rounded-sm transition-all duration-200 
            ml-${level * 4} pl-2 pr-4 py-1
            ${isSelected ? 'bg-mentat-secondary/40' : 'hover:bg-mentat-secondary/20'}
            ${isCurrent ? 'text-mentat-highlight' : 'text-mentat-primary/80'}
            group cursor-pointer
          `}
          onClick={() => handleItemClick(fullPath, isFolder)}
        >
          <div className="flex items-center gap-1.5 min-w-[24px]">
            {isFolder && (
              <button
                onClick={(e) => { e.stopPropagation(); toggleFolder(name); }}
                className={`
                  p-0.5 rounded-sm hover:bg-mentat-secondary/30 
                  transition-colors duration-200
                `}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-mentat-primary/60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-mentat-primary/60" />
                )}
              </button>
            )}
            {isFolder ? (
              <Folder className={`w-4 h-4 ${isCurrent ? 'text-mentat-highlight' : 'text-mentat-primary/60'}`} />
            ) : (
              <File className="w-4 h-4 text-mentat-primary/60" />
            )}
          </div>
          
          <span 
            className={`
              text-sm transition-all duration-200
              ${isCurrent ? 'text-mentat-highlight font-medium' : 'text-mentat-primary/80'} 
              group-hover:text-mentat-primary
            `}
          >
            {name}
          </span>
        </div>

        {isFolder && (
          <div 
            className={`
              ml-4 transition-all duration-200 overflow-hidden
              ${isExpanded ? 'animate-accordion-down' : 'animate-accordion-up h-0'}
            `}
          >
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
        <h3 className="text-mentat-highlight/80 text-sm font-medium">File System</h3>
      </div>

      <div className="space-y-0.5">
        {Object.entries(mockFiles).map(([folder]) => renderItem(folder, true))}
      </div>
    </div>
  );
};

export default FileExplorer;
