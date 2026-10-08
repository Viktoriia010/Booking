import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountTabs from "../components/account/AccountTabs";
import newsletters from "../data/newsletters";

const NewslettersPage = () => {
    const navigate = useNavigate();

    const [subscribed, setSubscribed] = useState(() => {
        const saved = localStorage.getItem(
            "newsletter_subscribed"
        );

        return saved === "true";
    });

    const [selectedTopics, setSelectedTopics] = useState<string[]>(() => {
        const topics = localStorage.getItem(
            "newsletter_topics"
        );

        if (!topics) {
            return [];
        }

        try {
            return JSON.parse(topics) as string[];
        } catch {
            return [];
        }
    });

    const toggleTopic = (id: string) => {
        const next = selectedTopics.includes(id)
            ? selectedTopics.filter(
                  (item) => item !== id
              )
            : [...selectedTopics, id];

        setSelectedTopics(next);

        localStorage.setItem(
            "newsletter_topics",
            JSON.stringify(next)
        );
    };

    const subscribe = () => {
        setSubscribed(true);

        localStorage.setItem(
            "newsletter_subscribed",
            "true"
        );
    };

    return (
        <div className="min-h-screen bg-white px-4 py-7 font-['Nunito_Sans'] sm:px-8">
            <div className="mx-auto max-w-[1120px]">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mb-5 text-[10px] text-[#999]"
                >
                    ← Main page
                </button>

                <AccountTabs />

                <h1 className="text-[24px] font-extrabold text-[#581ADB]">
                    Newsletters
                </h1>

                <div className="mt-5 grid gap-3 md:grid-cols-[1fr_300px]">
                    <div className="h-[150px] overflow-hidden rounded-[10px]">
                        <img
                            src={newsletters[0].image}
                            alt="Travel"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center rounded-[10px] border border-[#E5E5E5] p-5">
                        <p className="text-xs leading-5 text-[#777]">
                            We curate a daily selection of topics based on your interests and send them straight to your email address.
                        </p>

                        <button
                            type="button"
                            onClick={subscribe}
                            className="mt-4 w-fit rounded-full bg-[#581ADB] px-6 py-2 text-[10px] font-extrabold text-white"
                        >
                            {subscribed
                                ? "SUBSCRIBED"
                                : "SUBSCRIBE"}
                        </button>
                    </div>
                </div>

                <h2 className="mt-7 text-[10px] font-bold uppercase tracking-wide text-[#999]">
                    CHOOSE TOPICS
                </h2>

                <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {newsletters.map((newsletter) => (
                        <article
                            key={newsletter.id}
                            className="overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-white shadow-[0_3px_12px_rgba(0,0,0,0.04)]"
                        >
                            <img
                                src={newsletter.image}
                                alt={newsletter.title}
                                className="h-[150px] w-full object-cover"
                            />

                            <div className="p-4">
                                <h3 className="text-sm font-extrabold text-[#222]">
                                    {newsletter.title}
                                </h3>

                                <p className="mt-2 min-h-[95px] text-[11px] leading-5 text-[#777]">
                                    {newsletter.description}
                                </p>

                                <label className="mt-4 flex cursor-pointer items-center gap-2 text-[10px] text-[#777]">
                                    <input
                                        type="checkbox"
                                        checked={selectedTopics.includes(
                                            newsletter.id
                                        )}
                                        onChange={() =>
                                            toggleTopic(
                                                newsletter.id
                                            )
                                        }
                                        className="h-3.5 w-3.5 accent-[#581ADB]"
                                    />

                                    Choose this topic
                                </label>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewslettersPage;

