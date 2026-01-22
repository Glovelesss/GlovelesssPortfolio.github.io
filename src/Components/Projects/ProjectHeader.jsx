export default function ProjectHeader({ project })
{
    //---Fallback data---//
    const Title = project?.title ?? "Project Title";
    const Tagline = project?.tagline ?? "Project description goes here";
    const Thumbnail = project?.thumbnail ?? "/images/header-placeholder.jpg";

    return (
        <div className="relative w-full mb-4 overflow-hidden">
            {/* Banner Image */}
            <img
                src={Thumbnail}
                alt={Title}
                className="w-full h-48 sm:h-64 object-cover"
            />

            {/* Gradient overlay voor leesbaarheid */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

            {/* Text overlay */}
            <div className="absolute bottom-4 left-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md mb-1">
                    {Title}
                </h1>

                <p className="text-base text-gray-300 max-w-xl drop-shadow-sm font-medium">
                    {Tagline}
                </p>
            </div>
        </div>
    );
}
