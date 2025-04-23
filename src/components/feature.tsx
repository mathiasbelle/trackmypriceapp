import {
    Activity,
    Bell,
    FolderKanban,
    LayoutDashboard,
    Store,
    Users,
} from "lucide-react";
import { JSX } from "react";

interface FeatureProps {
    heading?: string;
    reasons?: {
        title: string;
        description: string;
        icon: JSX.Element;
    }[];
}

const Feature = ({
    heading = "Why Choose Our Price Tracking Service?",
    reasons = [
        {
            title: "Real-Time Price Tracking",
            description:
                "Stay updated with real-time price changes and never miss a great deal.",
            icon: <Activity size={32} />,
        },
        {
            title: "Automatic Alerts",
            description:
                "Receive instant notifications when prices drop on your favorite products.",
            icon: <Bell size={32} />,
        },
        {
            title: "Easy Product Management",
            description:
                "Organize and monitor all your tracked products in one convenient dashboard.",
            icon: <FolderKanban size={32} />,
        },
        {
            title: "Multi-Store Support",
            description:
                "Track prices from various online stores and compare them effortlessly.",
            icon: <Store size={32} />,
        },
        {
            title: "User-Friendly Interface",
            description:
                "A clean and intuitive design makes tracking your products simple and efficient.",
            icon: <LayoutDashboard size={32} />,
        },
        {
            title: "Open Source",
            description:
                "Check out the source code, modify it, and adapt it to your needs.",
            icon: <Users size={32} />,
        },
    ],
}: FeatureProps) => {
    return (
        <section id="features" className="py-32">
            <div className="container">
                <div className="mb-10 md:mb-20">
                    <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
                        {heading}
                    </h2>
                </div>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                                {reason.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                {reason.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Feature };
