import { Menu } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import AuthButtons from "./auth-buttons";
import Image from "next/image";

interface MenuItem {
    title: string;
    url: string;
}

interface NavbarProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: MenuItem;
        signup: MenuItem;
    };
}

const Navbar = ({
    logo = {
        url: "/",
        src: "/logo.svg",
        alt: "logo",
        title: "trackmypriceapp.com",
    },
    menu = [
        { title: "Home", url: "/#" },
        { title: "About", url: "/#hero" },
        { title: "Features", url: "/#features" },
        { title: "Supported Stores", url: "/#integration" },
    ],
}: NavbarProps) => {
    return (
        <section className="py-4">
            <div className="container w-full">
                <nav className="hidden w-full justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        <Link
                            href={logo.url}
                            className="flex items-center gap-2"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={32}
                                height={32}
                                className="max-h-8"
                            />
                            <span className="text-lg font-semibold tracking-tighter">
                                {logo.title}
                            </span>
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList className="w-full">
                                    {menu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <AuthButtons />
                    </div>
                </nav>

                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link
                            href={logo.url}
                            className="flex items-center gap-2"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={32}
                                height={32}
                                className="max-h-8"
                            />
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link
                                            href={logo.url}
                                            className="flex items-center gap-2"
                                        >
                                            <Image
                                                src={logo.src}
                                                alt={logo.alt}
                                                width={32}
                                                height={32}
                                                className="max-h-8"
                                            />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {menu.map((item) =>
                                            renderMobileMenuItem(item)
                                        )}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        <AuthButtons />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    return (
        <Link
            key={item.title}
            href={item.url}
            className="text-md font-semibold"
        >
            {item.title}
        </Link>
    );
};

export { Navbar };
