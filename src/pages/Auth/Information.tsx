import { useForm } from "react-hook-form";
import { apiFetch, readError } from "../../api";
import { useAuth } from "../../context/useAuth";
import {useEffect, useState} from "react";

type Location = {
    country: string;
    cities: string[];
};

type LocationsResponse = {
    error: boolean;
    msg: string;
    data: Location[];
};

type InformationFormData = {
    country: string;
    city: string;
    travelPurpose: string;
    travelingWithPet: boolean;
};

type InformationProps = {
    onSuccess: () => void;
};

const Information = ({onSuccess}:InformationProps) => {
    const { user } = useAuth();
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const response = await fetch("https://countriesnow.space/api/v0.1/countries");

                if (!response.ok) {
                    throw new Error("Failed to load locations");
                }

                const result: LocationsResponse = await response.json();

                setLocations(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadLocations();
    }, []);


    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: { isValid },
    } = useForm<InformationFormData>({
        mode: "onChange",
        defaultValues: {
            country: "",
            city: "",
            travelPurpose: "",
            travelingWithPet: false,
        },
    });

    const selectedCountry = watch("country");

    const cities =
        locations.find(
            (location) => location.country === selectedCountry
        )?.cities ?? [];

    const submit = async (data: InformationFormData) => {
        try {
            const formData = new FormData();

            formData.append("name", user?.name || "");
            formData.append("phone", user?.phone || "");
            formData.append("country", data.country);
            formData.append("city", data.city);
            formData.append("travelPurpose", data.travelPurpose);
            formData.append(
                "travelingWithPet",
                String(data.travelingWithPet)
            );

            const response = await apiFetch("/Account", {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            onSuccess();
        } catch (error) {
            console.error(
                error instanceof Error
                    ? error.message
                    : "Could not save information"
            );
        }
    };

    return (
            <div className="w-full max-w-[500px] rounded-[20px] bg-white px-10 py-6">
                    <h2 className="text-center text-[22px] font-bold text-[#581ADB]">
                        Information
                    </h2>



                <p className="mx-auto mt-7 max-w-[380px] text-[16px] leading-6 text-[#717171]">
                    Tell us about yourself so we can better
                    <br />
                    choose options for you :)
                </p>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="mt-3"
                >
                    <div className="relative">
                        <select
                            {...register("country", {
                                required: true,
                                onChange: () => {
                                    resetField("city");
                                },
                            })}
                            className="h-[53px] w-full cursor-pointer appearance-none rounded-full border border-[#DDDDDD] bg-white px-6 text-[16px] text-[#717171] outline-none transition focus:border-[#581ADB]"
                        >
                            <option value="" disabled>
                                Country
                            </option>

                            {locations.map((location) => (
                                <option key={location.country} value={location.country}>
                                    {location.country}
                                </option>
                            ))}
                        </select>

                        <span className="pointer-events-none absolute right-6 top-5.5 -translate-y-1/2 text-[#717171]">
                           ⌄
                        </span>
                    </div>

                    {/* City */}
                    <div className="relative mt-4">
                        <select
                            {...register("city", {
                                required: true,
                            })}
                            disabled={!selectedCountry}
                            className="h-[53px] w-full cursor-pointer appearance-none rounded-full border border-[#DDDDDD] bg-white px-6 text-[16px] text-[#717171] outline-none transition focus:border-[#581ADB] disabled:cursor-not-allowed disabled:bg-[#F5F5F5]"
                        >
                            <option value="" disabled>
                                City
                            </option>

                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

                        <span className="pointer-events-none absolute right-6 top-5.5 -translate-y-1/2 text-[#717171]">
                           ⌄
                        </span>
                    </div>

                    {/* Travel purpose */}
                    <div className="relative mt-4">
                        <select
                            {...register("travelPurpose", {
                                required: true,
                            })}
                            className="h-[53px] w-full cursor-pointer appearance-none rounded-full border border-[#DDDDDD] bg-white px-6 text-[16px] text-[#717171] outline-none transition focus:border-[#581ADB]"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Why do you travel?
                            </option>
                            <option value="Vacation">
                                Vacation
                            </option>
                            <option value="Business">
                                Business
                            </option>
                            <option value="Family">
                                Visiting family
                            </option>
                            <option value="Study">
                                Study
                            </option>
                        </select>

                        <span className="pointer-events-none absolute right-6 top-5.5 -translate-y-1/2 text-[#717171]">
                           ⌄
                        </span>
                    </div>

                    {/* Pet */}
                    <div className="mt-6">
                        <p className="mb-3 text-[16px] text-[#717171]">
                            Travelling with a pet?
                        </p>

                        <div className="flex gap-6">
                            <label className="flex cursor-pointer items-center gap-2 text-[16px] text-[#717171]">
                                <input
                                    type="radio"
                                    value="true"
                                    {...register("travelingWithPet", {
                                        setValueAs: (value) => value === "true",
                                    })}
                                    className="h-4 w-4 accent-[#581ADB]"
                                />
                                Yes
                            </label>

                            <label className="flex cursor-pointer items-center gap-2 text-[16px] text-[#717171]">
                                <input
                                    type="radio"
                                    value="false"
                                    {...register("travelingWithPet", {
                                        setValueAs: (value) => value === "true",
                                    })}
                                    className="h-4 w-4 accent-[#581ADB]"
                                />
                                No
                            </label>
                        </div>
                    </div>

                    {/* Continue */}
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="mt-16 h-[53px] w-full rounded-full font-semibold transition"
                        style={{
                            backgroundColor: isValid
                                ? "#5B21E6"
                                : "#D9D9D9",
                            color: isValid ? "white" : "#777",
                            cursor: isValid
                                ? "pointer"
                                : "not-allowed",
                        }}
                    >
                        Continue
                    </button>
                </form>

                {/* Later */}
                <button
                    type="button"
                    onClick={onSuccess}
                    className="mt-5 h-[53px] w-full cursor-pointer rounded-full border border-[#581ADB] font-semibold text-[#581ADB] transition hover:bg-[#5B21E6] hover:text-white"
                >
                    Later
                </button>
            </div>
    );
};

export default Information;
