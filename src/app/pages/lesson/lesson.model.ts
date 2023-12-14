export interface ILesson{
    id?: number;
    title?: string;
    time?: Date;
    video_url?: File;
    comment?: string;
    section_id?: number;
    section_name?: string;
} 

export class Lesson implements ILesson{
    constructor(
        public id?: number,
        public title?: string,
        public time?: Date,
        public video_url?: File,
        public comment?: string,
        public section_id?: number,
        public section_name?: string,
    ){}
}

export function getLessonIdentifier(lesson: Lesson){
    return lesson.id;
}
