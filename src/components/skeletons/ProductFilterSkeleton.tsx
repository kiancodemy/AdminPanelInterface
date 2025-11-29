export default function ProductFilterSkeleton() {
    return (
        <div className="absolute  inset-0 flex justify-start bg-black/50">
            <div className="md:w-[400px] overflow-y-scroll max-w-full container p-6 bg-white ">
                <div className="w-10 h-10 bg-gray-200 rounded mb-4"></div>

                <div className="space-y-4 ">
                    <div className="w-full h-16 md:h-20 bg-gray-200 rounded"></div>
                    <div className="w-full h-16 md:h-20 bg-gray-200 rounded"></div>
                    <div className="w-full h-16 md:h-20 bg-gray-200 rounded"></div>
                    <div className="w-full h-16 md:h-20 bg-gray-200 rounded"></div>
                    <div className="w-full h-12 md:h-14 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
}
