const Header = () => {
    return (
        <header className="border-b border-[#EEEEEE] bg-white">
            <div className="mx-auto flex h-[64px] w-full items-center justify-between px-4 sm:h-[80px] sm:px-6">

                <span className="text-lg font-bold sm:text-2xl">
                    Hotel for <span className="text-[#581ADB]">you.</span>
                </span>

                <div className="flex items-center gap-2 sm:gap-4">
                    <img
                        src="/uk-lang.svg"
                        alt="English"
                        className="h-5 w-5 cursor-pointer sm:h-auto sm:w-auto"
                    />

                    {/* Дуже маленький екран */}
                    <button className="flex cursor-pointer items-center gap-1.5 rounded-[30px] border border-[#DDDDDD] py-1.5 pl-3 pr-1.5 text-sm sm:hidden">
                        <span>Account</span>
                        <img
                            src="/profile-icon.svg"
                            alt="Profile icon"
                            className="h-5 w-5"
                        />
                    </button>

                    {/* sm і більше */}
                    <div className="hidden items-center gap-2 sm:flex sm:gap-4">
                        <button className="cursor-pointer rounded-[30px] border border-[#DDDDDD] px-3 py-1.5 text-sm sm:px-4 sm:text-[16px]">
                            Register
                        </button>

                        <button className="flex cursor-pointer items-center gap-1.5 rounded-[30px] border border-[#DDDDDD] py-1.5 pl-3 pr-1.5 text-sm sm:gap-2 sm:pl-4 sm:text-[16px]">
                            <span>Sign In</span>
                            <img
                                src="/profile-icon.svg"
                                alt="Profile icon"
                                className="h-5 w-5 sm:h-6 sm:w-6"
                            />
                        </button>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;