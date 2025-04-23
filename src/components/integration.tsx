import Image from "next/image";

interface IntegrationProps {
    heading?: string;
    description?: string;
    sites?: {
        logo: string;
        alt: string;
    }[];
}

const Integration = ({
    heading = "Supported Stores",
    description = "We currently support price tracking for the following stores:",
    sites = [
        {
            logo: "/icons/amazon.svg",
            alt: "Amazon logo",
        },
        {
            logo: "/icons/mercado-livre.svg",
            alt: "Mercado Livre logo",
        },
        {
            logo: "/icons/magalu.svg",
            alt: "Magalu logo",
        },
        {
            logo: "/icons/olx.svg",
            alt: "Olx logo",
        },
    ],
}: IntegrationProps) => {
    return (
        <section id="integration" className="py-32">
            <div className="container text-center">
                <div className="mb-10 md:mb-20">
                    <h2 className="mb-2 text-3xl font-semibold lg:text-5xl">
                        {heading}
                    </h2>
                    <p className="text-muted-foreground lg:text-lg">
                        {description}
                    </p>
                </div>
                <div className="flex justify-center gap-10">
                    {sites.map((site, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center rounded-full bg-accent p-4"
                        >
                            <Image
                                src={site.logo}
                                alt={site.alt}
                                width={128}
                                height={128}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Integration };
