declare module "photo" {
  interface photo {
    id?: string | number;
    url: string;
    caption: string;
    takenAt: string;
    createdAt?: string;
  }
}
