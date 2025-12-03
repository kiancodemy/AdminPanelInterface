import {Skeleton} from "@/components/ui/skeleton";

export default function ProductListSkeleton() {
    return (
        <div className="grid grow items-start grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-3">

            {/* Image */}
            {Array.from({length: 8}).map(() => (
                <div className="flex flex-col gap-y-4 p-2 bg-white rounded-md">

                    {/* Image */}
                    <Skeleton className="h-40 md:h-50 w-full rounded-md"/>

                    <div className="flex flex-col gap-y-5 items-center">

                        {/* Name */}
                        <Skeleton className="h-4 w-32"/>

                        <div className="flex flex-col gap-y-4 items-center">

                            {/* Price */}
                            <div className="flex gap-x-2">
                                <Skeleton className="h-4 w-20"/>
                                <Skeleton className="h-4 w-12"/>
                            </div>

                            {/* Stock */}
                            <Skeleton className="h-4 w-20"/>
                        </div>

                        {/* Button */}
                        <Skeleton className="h-10 w-32 rounded-md"/>

                    </div>

                </div>

            ))}
        </div>
    )

}