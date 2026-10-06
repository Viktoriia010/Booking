import {useState, type FormEvent,} from "react";

import { useNavigate } from "react-router-dom";

import Modal from "../../components/modal/Modal";
import {apiFetch, readError,} from "../../api";

import { useAuth } from "../../context/useAuth";

const Information = () => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [country, setCountry] =
        useState("");

    const [city, setCity] =
        useState("");

    const [travelPurpose, setTravelPurpose] =
        useState("");

    const [pet, setPet] =
        useState(false);

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const submit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append(
                "Name",
                user?.name || ""
            );

            formData.append(
                "Email",
                user?.email || ""
            );

            formData.append(
                "Phone",
                user?.phone || ""
            );

            formData.append(
                "Country",
                country
            );

            formData.append(
                "City",
                city
            );

            formData.append(
                "TravelPurpose",
                travelPurpose
            );

            formData.append(
                "TravelingWithPet",
                String(pet)
            );

            const response = await apiFetch(
                "/Account",
                {
                    method: "PUT",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(
                    await readError(response)
                );
            }

            navigate("/all-done");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not save information"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={true}
            closeModal={() => navigate("/")}
        >
            <div className="w-full px-8 pb-8 pt-4 font-['Nunito_Sans']">
                <h2 className="text-center text-[24px] font-extrabold text-[#581ADB]">
                    Information
                </h2>

                <p className="mt-2 text-center text-[13px] leading-5 text-[#777]">
                    Tell us about yourself so we can
                    <br />
                    better choose options for you :)
                </p>

                <form
                    onSubmit={submit}
                    className="mt-7"
                >
                    <div className="space-y-4">
                        <select
                            value={country}
                            onChange={(event) =>
                                setCountry(
                                    event.target.value
                                )
                            }
                            className="h-[48px] w-full rounded-full border border-[#DDDDDD] bg-white px-5 text-[14px] text-[#555] outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]"
                            required
                        >
                            <option value="">
                                Country
                            </option>

                            <option value="Ukraine">
                                Ukraine
                            </option>

                            <option value="Poland">
                                Poland
                            </option>

                            <option value="Germany">
                                Germany
                            </option>

                            <option value="France">
                                France
                            </option>

                            <option value="Italy">
                                Italy
                            </option>

                            <option value="Spain">
                                Spain
                            </option>

                            <option value="United Kingdom">
                                United Kingdom
                            </option>

                            <option value="United States">
                                United States
                            </option>
                        </select>

                        <select
                            value={city}
                            onChange={(event) =>
                                setCity(
                                    event.target.value
                                )
                            }
                            className="h-[48px] w-full rounded-full border border-[#DDDDDD] bg-white px-5 text-[14px] text-[#555] outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]"
                            required
                        >
                            <option value="">
                                City
                            </option>

                            <option value="Kyiv">
                                Kyiv
                            </option>

                            <option value="Dnipro">
                                Dnipro
                            </option>

                            <option value="Lviv">
                                Lviv
                            </option>

                            <option value="Odesa">
                                Odesa
                            </option>

                            <option value="Kharkiv">
                                Kharkiv
                            </option>

                            <option value="Warsaw">
                                Warsaw
                            </option>

                            <option value="Krakow">
                                Krakow
                            </option>

                            <option value="Berlin">
                                Berlin
                            </option>

                            <option value="Paris">
                                Paris
                            </option>

                            <option value="Rome">
                                Rome
                            </option>
                        </select>

                        <select
                            value={travelPurpose}
                            onChange={(event) =>
                                setTravelPurpose(
                                    event.target.value
                                )
                            }
                            className="h-[48px] w-full rounded-full border border-[#DDDDDD] bg-white px-5 text-[14px] text-[#555] outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9]"
                            required
                        >
                            <option value="">
                                Why do you travel?
                            </option>

                            <option value="Vacation">
                                Vacation
                            </option>

                            <option value="Business">
                                Business
                            </option>

                            <option value="Family">
                                Family
                            </option>

                            <option value="Study">
                                Study
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm font-semibold text-[#333]">
                            Travelling with a pet?
                        </p>

                        <div className="mt-3 flex gap-8">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#555]">
                                <input
                                    type="radio"
                                    name="pet"
                                    checked={pet}
                                    onChange={() =>
                                        setPet(true)
                                    }
                                    className="h-4 w-4 accent-[#581ADB]"
                                />

                                Yes
                            </label>

                            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#555]">
                                <input
                                    type="radio"
                                    name="pet"
                                    checked={!pet}
                                    onChange={() =>
                                        setPet(false)
                                    }
                                    className="h-4 w-4 accent-[#581ADB]"
                                />

                                No
                            </label>
                        </div>
                    </div>

                    {error && (
                        <p className="mt-4 text-center text-xs text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-7 h-[50px] w-full rounded-full bg-[#581ADB] text-sm font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Loading..."
                            : "Continue"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/all-done")
                        }
                        className="mt-3 h-[50px] w-full rounded-full border border-[#D8D8D8] bg-white text-sm font-semibold text-[#555] transition hover:bg-[#FAFAFA]"
                    >
                        Later
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default Information;