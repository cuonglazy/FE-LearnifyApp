export interface ICourse{
category: any;
    id?: number;
    title?: string;
    price?: number;
    start_time?: Date;
    end_time?: Date;
    enrollment_count?: number;
    thumbnail?: string;
    isActive?: boolean;
    description?: string;
    user_id?: number;
    category_id?: number;
    category_name?: string;
    user_name?: string;
}

export class Course implements ICourse{
    constructor(
        public id?: number,
        public title?: string,
        public price?: number,
        public start_time?: Date,
        public end_time?: Date,
        public enrollment_count?: number,
        public thumbnail?: string,
        public isActive?: boolean,
        public description?: string,
        public user_id?: number,
        public category_id?: number,
        public category_name?: string,
        public user_name?: string,
        ){
        this.isActive = isActive ?? true;
    }
    category: any;
}

export function getCourseIdentifier(course: ICourse){
    return course.id;
}