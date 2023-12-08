export interface ISection{
    id?: number;
    title?: string;
    quantityLesson?: number;
    totalMinutes?: number;
    resource?: string;
    courseId?: number; 
}

export class Section implements ISection{
    
}