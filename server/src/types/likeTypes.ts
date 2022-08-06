export interface ILike {
  _id: string;
  userId: string;
  planId: string;
}

export interface Like {
  userId: string;
  planId: string;
}

export interface ILikeModel {
  create: (likeInfo: Like) => Promise<ILike | null>;
  delete: (likeInfo: Like) => Promise<ILike | null>;
  deleteAll: (userId: string, likedPlans: string[]) => void;
}

export interface ILikeService {
  addLike: (likeInfo: Like) => Promise<ILike | null>;
  deleteLike: (likeInfo: Like) => Promise<ILike | null>;
  deleteAll: (userId: string, likedPlans: string[]) => void;
}
