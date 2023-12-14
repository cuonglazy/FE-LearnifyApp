export interface ILesson{
    id?: number;
    title?: string | null;
    time?: string;
    video_url?: string;
    section_id?: number | null;
}
export class Lesson implements ILesson{
    constructor(
        public id?: number,
        public title?: string | null,
        public time?: string,
        public video_url?: string,
        public section_id?: number | null,
    ) {}
}

export function getLessonIdentifier(lesson: Lesson) {
    return lesson.id;
}
