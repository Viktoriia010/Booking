const server = import.meta.env.VITE_PATH_TO_SERVER || "http://localhost:5019/";
const api = import.meta.env.VITE_PATH_TO_API || "api/v1/";

export const API_URL =
    `${server.replace(/\/$/, "")}/${api.replace(/^\//, "")}`.replace(/\/$/, "");

export const SERVER_URL = server.replace(/\/$/, "");

export const getImageUrl = (url?: string | null): string | undefined => {
    if (!url) return undefined;

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    return `${SERVER_URL}/hotels/${url.replace(/^\/+/, "")}`;
};

export const getAvatarUrl = (url: string) => {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${SERVER_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

export const getToken = () => localStorage.getItem("accessToken");

// Оновлюємо токен через Refresh Token
async function refreshAccessToken(): Promise<string | null> {
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Refresh failed");
        }

        const data = await response.json();
        const newAccessToken = data.accessToken;

        if (typeof newAccessToken !== "string" || !newAccessToken) {
            throw new Error("Access token missing");
        }

        localStorage.setItem("accessToken", newAccessToken);

        window.dispatchEvent(
            new CustomEvent("accessTokenUpdated", {
                detail: newAccessToken,
            })
        );

        return newAccessToken;
    } catch (error) {
        console.error("Token refresh failed:", error);

        localStorage.removeItem("accessToken");

        window.dispatchEvent(new Event("authRefreshFailed"));

        return null;
    }
}

// Основна обгортка для всіх API-запитів
export async function apiFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

    const headers = new Headers(options.headers);
    const token = getToken();

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    if (
        options.body &&
        !(options.body instanceof FormData) &&
        !headers.has("Content-Type")
    ) {
        headers.set("Content-Type", "application/json");
    }

    const config: RequestInit = {
        ...options,
        headers,
        credentials: "include",
    };

    // 1. Перший запит
    let response = await fetch(url, config);

    // 2. Якщо помилка не 401, повертаємо відповідь
    if (response.status !== 401) {
        return response;
    }

    // Не повторюємо refresh для самого endpoint оновлення
    if (path.replace(/^\/+/, "") === "auth/refresh") {
        return response;
    }

    // 3. Оновлюємо Access Token
    const newToken = await refreshAccessToken();

    if (!newToken) {
        return response;
    }

    // 4. Повторюємо початковий запит із новим токеном
    const retryHeaders = new Headers(options.headers);
    retryHeaders.set("Authorization", `Bearer ${newToken}`);

    if (
        options.body &&
        !(options.body instanceof FormData) &&
        !retryHeaders.has("Content-Type")
    ) {
        retryHeaders.set("Content-Type", "application/json");
    }

    response = await fetch(url, {
        ...config,
        headers: retryHeaders,
    });

    return response;
}

export async function readError(response: Response) {
    const data = await response.json().catch(() => null);
    return data?.message || "Request failed";
}