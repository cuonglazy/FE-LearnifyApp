export interface ICategory {
  id?: number;
  name?: string;
  is_delete?: boolean;
  parent_id?: number;
  parentName?: string;
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string,
    public is_delete?: boolean,
    public parent_id?: number,
    public parentName?: string
  ) {
    this.is_delete = is_delete ?? true;
  }
}

export function getLessonIdentifier(category: ICategory) {
  return category.id;
}
