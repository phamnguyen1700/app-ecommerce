export interface IBrand {
    _id: string,
    brandName: string,
    isDeleted: boolean,
    createdAt: string,
    updatedAt: string,
}

export interface IBrandFilter {
    page?: number;
    limit?: number;
    brandName?: string;
    isDeleted?: string;
}