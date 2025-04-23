import { Feature } from "@/components/feature";
import { Hero } from "@/components/hero";
import { Integration } from "@/components/integration";

export default function Home() {
    return (
        <div className="overflow-x-auto w-full p-4">
            <Hero />
            <Feature />
            <Integration />
        </div>
    );
}
