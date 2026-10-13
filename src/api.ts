const server = (
    import.meta.env.VITE_PATH_TO_SERVER || "http://localhost:5019/"
).replace(/\/+$/, "");

const api = import.meta.env.VITE_PATH_TO_API || "api/v1/";

export const API_URL =
    `${server}/${api.replace(/^\/+|\/+$/g, "")}`;

export const SERVER_URL = server;

export const getImageUrl = (
    url: string | null | undefined
): string | undefined => {
    if (!url || !url.trim()) {
        return undefined;
    }

    const imageUrl = url.trim().replace(/\\/g, "/");
    if (/^https?:\/\//i.test(imageUrl)) {
        return imageUrl;
    }

    const normalizedPath = imageUrl
        .replace(/^\.?\/?wwwroot\//i, "")
        .replace(/^\.?\/?Booking\.Api\/wwwroot\//i, "")
        .replace(/^\/+/, "");

    if (/^(hotels|rooms|avatars)\//i.test(normalizedPath)) {
        return `${SERVER_URL}/${normalizedPath}`;
    }

    return `${SERVER_URL}/hotels/${normalizedPath}`;
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

    if (
        options.body &&
        !headers.has("Content-Type") &&
        !(options.body instanceof FormData)
    ) {
        headers.set("Content-Type", "application/json");
    }

    return fetch(
        `${API_URL}/${path.replace(/^\/+/, "")}`,
        {
            ...options,
            headers,
            credentials: "include",
        }
    );
}

export async function readError(response: Response) {
    const data = await response.json().catch(() => null);
    return data?.message || "Request failed";
}
