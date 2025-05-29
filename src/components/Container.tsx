
interface ContainerProps {
    children: React.ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const maxWidthClasses = {
    sm: "max-w-[640px]",
    md: "max-w-[768px]",
    lg: "max-w-[1024px]",
    xl: "max-w-[1200px]",
    "2xl": "max-w-[1400px]",
    "3xl": "max-w-[1500px]",
};

const Container: React.FC<ContainerProps> = ({ children, maxWidth = "3xl" }) => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-8 md:px-16 lg:px-32 relative`}>
                {children}
            </div>
        </div>
    );
};

export default Container;
