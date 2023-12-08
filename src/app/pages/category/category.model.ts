export interface ICategory {
  id?: number;
  name?: string | null;
  is_delete?: boolean;
  parent_id?: number | null;
  parentName?: string;
  level?: number;
  children?: number;
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string | null,
    public is_delete?: boolean,
    public parent_id?: number | null,
    public parentName?: string,
    public level?: number,
    public children?: number,
  ) {
    this.is_delete = is_delete ?? true;
  }
}

export function getCategoryIdentifier(category: ICategory) {
  return category.id;
}
