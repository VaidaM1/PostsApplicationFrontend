import { Post } from './post';

export interface Parcel {
    id: number,
    fullName: string,
    weight: number,
    phone: string,
    info: string,
    postId: number,
    post?: Post,
};