export interface ISection{
    id?: number;
    title?: string;
    quantity_lesson?: number;
    total_minutes?: number;
    resource?: string;
    course_id?: number;
    is_delete?: boolean;
}

export class Section implements ISection{
    constructor(
        public id?: number,
        public title?: string,
        public quantity_lesson?: number,
        public total_minutes?: number,
        public resource?: string,
        public course_id?: number,
        public is_delete?: boolean
    ){}
}

export function getSectionIdentifier(section: ISection): number | undefined {
    return section.id;
}