import {NavLink,} from "react-router-dom";

const tabs = [
    {
        path: "/account",
        label: "Account",
        icon: "●",
    },
    {
        path: "/payment-method",
        label: "Payment method",
        icon: "◈",
    },
    {
        path: "/travel-information",
        label: "Travel information",
        icon: "♙",
    },
    {
        path: "/newsletters",
        label: "Newsletters",
        icon: "✉",
    },
    {
        path: "/security",
        label: "Security",
        icon: "◉",
    },
];

const AccountTabs = () => {
    return (
        <div className="mb-7 flex flex-wrap gap-2 font-['Nunito_Sans']">
            {tabs.map(tab => (
                <NavLink
                    key={tab.path}
                    to={tab.path}
                    className={({ isActive }) =>
                        `flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold transition ${
                            isActive
                                ? "border-[#581ADB] bg-[#F4EDFF] text-[#581ADB]"
                                : "border-[#DDDDDD] bg-white text-[#666] hover:border-[#581ADB]"
                        }`
                    }
                >
                    <span>
                        {tab.icon}
                    </span>

                    {tab.label}
                </NavLink>
            ))}
        </div>
    );
};

export default AccountTabs;