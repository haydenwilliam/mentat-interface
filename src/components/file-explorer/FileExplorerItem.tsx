
import { ChevronDown, ChevronRight, File, Folder, PlusCircle } from 'lucide-react';
import { FileSystemStructure } from './types';

interface FileExplorerItemProps {
  name: string;
  isFolder: boolean;
  isExpanded: boolean;
  isSelected: boolean;
  isCurrent: boolean;
  level: number;
  parentPath: string;
  content?: FileSystemStructure[string];
  expanded: string[];
  onToggleFolder: (folder: string) => void;
  onItemClick: (path: string, isFolder: boolean) => void;
  onAddToContext: (e: React.MouseEvent, path: string) => void;
}

const FileExplorerItem = ({
  name,
  isFolder,
  isExpanded,
  isSelected,
  isCurrent,
  level,
  parentPath,
  content,
  expanded,
  onToggleFolder,
  onItemClick,
  onAddToContext,
}: FileExplorerItemProps) => {
  const fullPath = `${parentPath}/${name}`;

  return (
    <div className="relative">
      <div
        className={`
          relative flex items-center justify-between px-2 py-1.5 rounded-md
          transition-all duration-200 ease-in-out group
          ${isSelected ? 'bg-mentat-primary/10 shadow-[0_0_10px_rgba(0,229,255,0.1)]' : 
            'hover:bg-mentat-secondary/30'}
          ${isCurrent ? 'border-l-2 border-mentat-highlight' : ''}
        `}
        onClick={() => onItemClick(fullPath, isFolder)}
        style={{ marginLeft: `${level * 16}px` }}
      >
        <div className="flex items-center gap-2 min-w-[24px]">
          {isFolder && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFolder(name); }}
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
          <span 
            className={`
              text-sm transition-all duration-200
              ${isCurrent ? 'text-mentat-highlight font-medium' : 'text-mentat-primary/90'} 
              ${isSelected ? 'text-mentat-highlight' : ''}
            `}
          >
            {name}
          </span>
        </div>
        
        {!isFolder && (
          <button
            onClick={(e) => onAddToContext(e, fullPath)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
              p-1 rounded-md hover:bg-mentat-secondary/50"
            title="Add to context"
          >
            <PlusCircle className="w-4 h-4 text-mentat-primary/60 hover:text-mentat-highlight" />
          </button>
        )}
      </div>

      {isFolder && content && (
        <div 
          className={`
            overflow-hidden transition-all duration-200 ease-in-out
            ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
            relative
          `}
        >
          <div 
            className="absolute left-[7px] top-0 w-px bg-mentat-border/30 h-full"
            style={{ left: `${level * 16 + 11}px` }}
          />
          
          {(() => {
            if (!content) return null;
            
            if (Array.isArray(content)) {
              return content.map(file => (
                <FileExplorerItem
                  key={`${fullPath}/${file}`}
                  name={file}
                  isFolder={false}
                  isExpanded={false}
                  isSelected={false}
                  isCurrent={false}
                  level={level + 1}
                  parentPath={fullPath}
                  expanded={expanded}
                  onToggleFolder={onToggleFolder}
                  onItemClick={onItemClick}
                  onAddToContext={onAddToContext}
                />
              ));
            } else {
              return Object.entries(content).map(([subFolder, files]) => (
                <div key={subFolder}>
                  <FileExplorerItem
                    name={subFolder}
                    isFolder={true}
                    isExpanded={expanded.includes(subFolder)}
                    isSelected={false}
                    isCurrent={false}
                    level={level + 1}
                    parentPath={fullPath}
                    content={files}
                    expanded={expanded}
                    onToggleFolder={onToggleFolder}
                    onItemClick={onItemClick}
                    onAddToContext={onAddToContext}
                  />
                </div>
              ));
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default FileExplorerItem;
