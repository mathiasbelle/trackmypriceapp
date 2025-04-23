import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
    heading?: string;
    description?: string;
    button?: {
        text: string;
        url: string;
    };
    image?: {
        src: string;
        alt: string;
    };
}

const Hero = ({
    heading = "Track Prices and Save Money on Your Favorite Products",
    description = "Monitor price changes and get notified when your desired products become more affordable. Stay ahead with real-time updates and never miss a deal!",
    button = {
        text: "Start Tracking Now",
        url: "/signup",
    },
    image = {
        src: "/images/product-table.PNG",
        alt: "Example of a tracked products table with price history",
    },
}: HeroProps) => {
    return (
        <section id="hero" className="py-32">
            <div className="container">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                            {heading}
                        </h1>
                        <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                            {description}
                        </p>
                        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                            {button && (
                                <Button asChild className="w-full sm:w-auto">
                                    <Link href={button.url}>{button.text}</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        height={4096}
                        width={2012}
                        className="max-h-96 w-full rounded-md object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export { Hero };
