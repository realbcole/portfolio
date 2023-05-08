import TransitionEffect from "@/components/TransitionEffect";

// Survive Project
const Survive = () => {
    return (
        <div className='w-[95%] mx-auto p-0.5 my-5'>
            <TransitionEffect />
            <iframe
                src="./projects/survive/index.html"
                className="w-full h-[80vh]" />
        </div>

    );
};

export default Survive;