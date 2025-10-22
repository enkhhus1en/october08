declare module "pageview" {
  interface pageview {
    id?: string | number;
    path: string;
    userAgent: string;
    ip: string;
    createdAt: string;
  }
}
