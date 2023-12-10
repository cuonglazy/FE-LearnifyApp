export interface ICourse{
    id?: number;
    title?: string;
    price?: number;
    start_time?: Date;
    end_time?: Date;
    enrollment_count?: number;
    thumbnail?: string;
    is_delete?: boolean;
    description?: string;
    user_id?: number;
    category_id?: number;
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
        public is_delete?: boolean,
        public description?: string,
        public user_id?: number,
        public category_id?: number,
        ){
        this.is_delete = is_delete ?? true;
    }
}

export function getCourseIdentifier(course: ICourse){
    return course.id;
}