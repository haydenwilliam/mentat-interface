
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const mockFiles = {
  projects: {
    'project-alpha': ['config.json', 'main.py', 'data.db'],
    'project-beta': ['settings.yml', 'index.js'],
  },
  documents: ['report.md', 'notes.txt'],
  system: ['logs.txt', 'backup.zip'],
};

const FileExplorer = () => {
  const [expanded, setExpanded] = useState<string[]>(['projects']);

  const toggleFolder = (folder: string) => {
    setExpanded(prev => 
      prev.includes(folder)
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };

  return (
    <div className="w-64 bg-mentat-secondary/20 border-l border-mentat-border p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-mentat-highlight/80 text-sm">File System</h3>
      </div>

      <div className="space-y-2">
        {Object.entries(mockFiles).map(([folder, contents]) => (
          <div key={folder} className="space-y-1">
            <button
              onClick={() => toggleFolder(folder)}
              className="w-full flex items-center gap-2 p-1 hover:bg-mentat-secondary/30 rounded text-sm group"
            >
              {expanded.includes(folder) ? (
                <ChevronDown className="w-4 h-4 text-mentat-primary/60" />
              ) : (
                <ChevronRight className="w-4 h-4 text-mentat-primary/60" />
              )}
              <Folder className="w-4 h-4 text-mentat-primary/60" />
              <span className="text-mentat-primary/80 group-hover:text-mentat-primary">
                {folder}
              </span>
            </button>

            {expanded.includes(folder) && (
              <div className="ml-6 space-y-1">
                {Array.isArray(contents)
                  ? contents.map(file => (
                      <div
                        key={file}
                        className="flex items-center gap-2 p-1 text-sm group"
                      >
                        <File className="w-4 h-4 text-mentat-primary/60" />
                        <span className="text-mentat-primary/60 group-hover:text-mentat-primary">
                          {file}
                        </span>
                      </div>
                    ))
                  : Object.entries(contents).map(([subFolder, files]) => (
                      <div key={subFolder} className="space-y-1">
                        <div className="flex items-center gap-2 p-1 text-sm">
                          <Folder className="w-4 h-4 text-mentat-primary/60" />
                          <span className="text-mentat-primary/80">{subFolder}</span>
                        </div>
                        <div className="ml-4">
                          {files.map(file => (
                            <div
                              key={file}
                              className="flex items-center gap-2 p-1 text-sm group"
                            >
                              <File className="w-4 h-4 text-mentat-primary/60" />
                              <span className="text-mentat-primary/60 group-hover:text-mentat-primary">
                                {file}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
