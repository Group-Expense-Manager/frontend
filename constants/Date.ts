export const formatDateToDefaultFormat = (date: Date | undefined | null): string | undefined => {
  if (!date) return undefined;

  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
