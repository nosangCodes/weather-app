export default function useIsOnline(params) {
  const isOnline = navigator.onLine;
  return { isOnline };
}
