
export type FileSystemValue = string[] | { [key: string]: FileSystemValue };

export interface FileSystemStructure {
  [key: string]: FileSystemValue;
}

export interface FileExplorerProps {
  currentDirectory?: string;
  onDirectorySelect?: (path: string) => void;
  onAddToContext?: (path: string) => void;
}

export const mockFiles: FileSystemStructure = {
  projects: {
    'project-alpha': ['config.json', 'main.py', 'data.db'],
    'project-beta': ['settings.yml', 'index.js'],
  },
  documents: ['report.md', 'notes.txt'],
  system: ['logs.txt', 'backup.zip'],
};
