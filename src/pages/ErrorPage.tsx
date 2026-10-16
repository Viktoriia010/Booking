import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9fc] px-4 text-center">
                <h1 className="text-3xl font-bold text-[#581ADB]">
                    Упс!
                </h1>

                <p className="mt-3 text-[#555]">
                    Щось пішло не так.
                </p>

                <p className="mt-2 text-sm text-[#777]">
                    HTTP помилка: {error.status}
                </p>

                {error.statusText && (
                    <p className="mt-1 text-sm text-[#777]">
                        {error.statusText}
                    </p>
                )}
            </div>
        );
    }

    const errorMessage =
        error instanceof Error
            ? error.message
            : "Сталася невідома помилка.";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9fc] px-4 text-center">
            <h1 className="text-3xl font-bold text-[#581ADB]">
                Упс!
            </h1>

            <p className="mt-3 text-[#555]">
                Сталася невідома помилка.
            </p>

            {import.meta.env.DEV && (
                <p className="mt-2 max-w-2xl break-words text-sm text-[#777]">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}