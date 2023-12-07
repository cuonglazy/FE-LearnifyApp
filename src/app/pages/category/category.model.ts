export interface ICategory{
    id?: number;
    name?: string;
    isDelete?: boolean;
    parentId?: number;
    parentName?: string;
}

export class Category implements ICategory{
    constructor(
        public id?: number,
        public name?: string,
        public isDelete?: boolean,
        public parentId?: number,
        public parentName?: string,
    ){
        this.isDelete = isDelete ?? true;
    }
}

export  function getLessonIdentifier(category: ICategory){
    return category.id;
  }