export type PageId = 'landing' | 'dashboard' | 'analysis' | 'results';

/** Maps PageId to URL path for the router */
export const PAGE_PATHS: Record<PageId, string> = {
  landing: '/',
  dashboard: '/dashboard',
  analysis: '/analysis',
  results: '/results',
};
