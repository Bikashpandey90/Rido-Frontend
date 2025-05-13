const TrustedBy = () => {
    return <section className="w-full py-6 sm:py-8 border-y border-gray-200 dark:border-gray-800">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">TRUSTED BY LEADING COMPANIES</p>
                <div className="grid grid-cols-3 xs:grid-cols-3 md:grid-cols-5 gap-2 xs:gap-3 sm:gap-4 w-full">
                    {["Company A", "Company B", "Company C", "Company D", "Company E"].map((company, index) => (
                        <div key={index} className="flex items-center justify-center">
                            <div className="h-6 sm:h-8 w-full max-w-[80px] sm:max-w-[120px] bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center">
                                <span className="text-[10px] xs:text-xs text-muted-foreground">{company}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
}

export default TrustedBy