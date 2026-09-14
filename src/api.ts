const server = import.meta.env.VITE_PATH_TO_SERVER || "http://localhost:5019/";
const api = import.meta.env.VITE_PATH_TO_API || "api/v1/";

export const API_URL =
    `${server.replace(/\/$/, "")}/${api.replace(/^\//, "")}`.replace(/\/$/, "");

export const SERVER_URL = server.replace(/\/$/, "");

export const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${SERVER_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

export const getToken = () => localStorage.getItem("accessToken");

export async function apiFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    const headers = new Headers(options.headers);
    const token = getToken();

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    if (options.body && !headers.has("Content-Type") && !(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }

    return fetch(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`, {
        ...options,
        headers,
        credentials: "include",
    });
}

export async function readError(response: Response) {
    const data = await response.json().catch(() => null);
    return data?.message || "Request failed";
}
