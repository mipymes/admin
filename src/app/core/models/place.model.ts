export interface IPlace{
    id ?: string,
    name: string,
    categories: any,
    description: string,
    facebookUrl ?: string,
    instagramUrl ?: string,
    phone: number,
    delivery ?: boolean,
    visible: boolean,
    approved: boolean,
    schedules: any[],
    location: any,
    rating ?: number,
    ratingCount ?: number
}