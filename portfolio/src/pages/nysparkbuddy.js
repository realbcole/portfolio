import TransitionEffect from "@/components/TransitionEffect";

// NYSParkBuddy Project
const NYSParkBuddy = () => {
    return (
        <div className='border border-dark dark:border-light w-[95%] mx-auto p-0.5 my-5'>
            <TransitionEffect />
            <iframe
                src="./projects/nysparkbuddy/index.html"
                className="w-full h-[75vh]"
            />
        </div>

    )
}

export default NYSParkBuddy