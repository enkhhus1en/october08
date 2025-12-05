declare module "watched" {
  interface watched {
    id: number;
    title: string;
    type?: string;
    platform?: string;
    notes?: string;
    coverUrl?: string;
    rating?: number;
    createdAt?: string;
  }
}
