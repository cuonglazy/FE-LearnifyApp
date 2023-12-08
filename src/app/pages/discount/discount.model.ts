export interface IDiscount {
    id?: number;
    code?: string;
    percentage?: number;
    startDate?: Date;
    startEnd?: Date;
    isActive?: boolean;
}

export class Discount implements IDiscount {
    constructor(
        public id?: number,
        public code?: string,
        public percentage?: number,
        public startDate?: Date,
        public startEnd?: Date,
        public isActive?: boolean,
    ) {
        this.isActive = this.isActive ?? true;
    }
}

export interface IDiscountCourse {
    id?: number;
    course_id?: number;
    discount_id?: number;
    is_delete?: boolean;
}

export function getDiscountIdentifier(discount: IDiscount): number | undefined {
    return discount.id;
}
