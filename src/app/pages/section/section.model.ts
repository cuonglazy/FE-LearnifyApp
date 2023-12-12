export interface ISection{
    id?: number;
    title?: string;
    quantityLesson?: number;
    totalMinutes?: number;
    resource?: string;
    courseId?: number; 
}

export class Section implements ISection{
    constructor(
        public id?: number,
        public title?: string,
        public quantityLesson?: number,
        public totalMinutes?: number,
        public resource?: string,
        public courseId?: number,
    ){}
}