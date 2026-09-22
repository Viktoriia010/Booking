import {isRouteErrorResponse, useRouteError} from "react-router";

export default function ErrorPage() {

    const error = useRouteError();

    // Якщо це помилка HTTP
    if (isRouteErrorResponse(error)) {

        return (
            <div>
                <h1>Упс! </h1>
                <p>
                    Щось пішло не так.
                </p>

                <p>
                    HTTP помилка: {error.status}
                </p>

                <p>
                    {error.statusText}
                </p>
            </div>
        );
    }


    // Інша невідома помилка
    return (
        <div>
            <h1>Упс!</h1>
            <p>
                Сталася невідома помилка.
            </p>
        </div>
    );
}