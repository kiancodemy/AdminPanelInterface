import { Skeleton } from "@/components/ui/skeleton"

export default function NewProductFormSkeleton() {
    return (
        <div className="space-y-4 p-4">
            {/* header */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-32"/>
                <Skeleton className="h-4 w-48"/>
            </div>

            <div className="grid gap-4 max-h-[55vh] md:max-h-[65vh] overflow-y-auto">

                {/* name */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20"/>
                    <Skeleton className="h-10 w-full"/>
                </div>

                {/* description */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20"/>
                    <Skeleton className="h-20 w-full"/>
                </div>

                {/* price */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16"/>
                    <Skeleton className="h-10 w-full"/>
                </div>

                {/* stock */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16"/>
                    <Skeleton className="h-10 w-full"/>
                </div>

                {/* category */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24"/>
                    <Skeleton className="h-10 w-full"/>
                </div>
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-3 pt-4">
                <Skeleton className="h-10 w-24"/>
                <Skeleton className="h-10 w-28"/>
            </div>
        </div>
    )
}