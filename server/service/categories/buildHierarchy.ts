import { Category } from "@/types";

export const buildHierarchy = (items: Category[]): Category[] => {
  const map = new Map<string, Category>();
  const roots: Category[] = [];

  items.forEach((item: Category) => {
    map.set(item.id, { ...item, children: [] });
  });

  items.forEach((item: Category) => {
    const pathParts = item.path.split("/");

    console.log(pathParts);
    if (pathParts.length > 1) {
      const parentPath = pathParts[pathParts.length - 2];
      const parent = map.get(parentPath);
      console.log(">: ", parentPath, item.id);
      if (parent) {
        parent.children.push(map.get(item.id)!);
      }
    } else {
      roots.push(map.get(item.id)!);
    }
  });

  return roots as Category[];
};
