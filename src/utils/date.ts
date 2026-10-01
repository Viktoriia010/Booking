export const getDaysAgo = (date: string|Date) => {
    const now = new Date();
    const difference = now.getTime() - new Date(date).getTime();

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";

    return `${days} days ago`;
};