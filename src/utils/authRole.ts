export const getUserRole = (): string => {
    try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            return "";
        }

        const parts = token.split(".");

        if (parts.length !== 3 || !parts[1]) {
            return "";
        }

        const encoded = parts[1];

        const normalized = encoded
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(Math.ceil(encoded.length / 4) * 4, "=");

        const payload = JSON.parse(atob(normalized));

        const role =
            payload.role ??
            payload[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];

        if (Array.isArray(role)) {
            return role.map(String).join(",");
        }

        return String(role ?? "");
    } catch {
        return "";
    }
};

export const canManageReviews = (
    role = getUserRole()
): boolean => {
    const normalizedRole = role.toLowerCase();

    return (
        role === "1" ||
        role === "2" ||
        normalizedRole === "admin" ||
        normalizedRole === "moderator"
    );
};

export const isAdministrator = (
    role = getUserRole()
): boolean => {
    return (
        role === "1" ||
        role.toLowerCase() === "admin"
    );
};
