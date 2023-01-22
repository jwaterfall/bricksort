import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb: FC = () => {
    const pathName = usePathname() ?? "/";
    const pathParts = pathName === "/" ? [""] : pathName.split("/");

    const getPath = (index: number) => {
        const path = pathParts.slice(0, index + 1).join("/");
        return path === "" ? "/" : path;
    };

    const getLabel = (pathPart: String) => {
        if (pathPart === "") return "Home";
        return pathPart.charAt(0).toUpperCase() + pathPart.slice(1).replaceAll("-", " ");
    };

    return (
        <nav className="flex items-center" aria-label="breadcrumb">
            {pathParts.map((pathPart, index) => (
                <h4 key={index} className="text-sm font-medium after:content-['>'] after:mx-2 last:after:content-[''] last:after:mx-0">
                    <Link href={getPath(index)} className="hover:underline">
                        {getLabel(pathPart)}
                    </Link>
                </h4>
            ))}
        </nav>
    );
};

export default Breadcrumb;
