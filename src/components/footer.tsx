import Image from "next/image";
import Link from "next/link";

interface FooterProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    tagline?: string;
    copyright?: string;
    authorName?: string;
    repoLink?: string;
}

const Footer = ({
    logo = {
        url: "/",
        src: "/logo.svg",
        alt: "logo",
        title: "trackmypriceapp.com",
    },
    tagline = "Easy price tracking for your favorite products.",
    copyright = `© ${new Date().getFullYear()} trackmypriceapp.com. All rights reserved.`,
    authorName = process.env.AUTHOR_NAME || "",
    repoLink = process.env.REPO_LINK || "",
}: FooterProps) => {
    return (
        <section className="py-32">
            <div className="container">
                <footer>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                        <div className="col-span-2 mb-8 lg:mb-0">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <Link href="/">
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        title={logo.title}
                                        className="h-10"
                                    />
                                </Link>
                                <p className="text-xl font-semibold">
                                    {logo.title}
                                </p>
                            </div>
                            <p className="mt-4 font-bold">{tagline}</p>
                        </div>
                    </div>
                    <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
                        <p>{copyright}</p>
                        <div className="flex items-center gap-2">
                            <p>Built by {authorName} </p>
                            <Link
                                href={repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                            >
                                <Image
                                    src="/icons/github.svg"
                                    alt="GitHub logo"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export { Footer };
