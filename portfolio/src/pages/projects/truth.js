import TransitionEffect from "@/components/TransitionEffect";

// Survive Project
const Truth = () => {
    return (
        <div className='w-[95%] mx-auto p-0.5 my-5'>
            <TransitionEffect />
            <iframe
                src="./projects/truth/index.html"
                className="w-full h-[80vh]" />
        </div>

    );
};

export default Truth;