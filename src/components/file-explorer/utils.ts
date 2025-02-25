
import { FileSystemStructure, FileSystemValue } from './types';

export const filterItems = (items: FileSystemStructure, searchQuery: string): FileSystemStructure => {
  const filtered: { [key: string]: FileSystemValue } = {};
  
  Object.entries(items).forEach(([key, value]) => {
    if (key.toLowerCase().includes(searchQuery.toLowerCase())) {
      filtered[key] = value;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      const filteredSubItems = filterItems(value as FileSystemStructure);
      if (Object.keys(filteredSubItems).length > 0) {
        filtered[key] = filteredSubItems;
      }
    } else if (Array.isArray(value)) {
      const filteredFiles = value.filter((file: string) => 
        file.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredFiles.length > 0) {
        filtered[key] = filteredFiles;
      }
    }
  });

  return filtered;
};
