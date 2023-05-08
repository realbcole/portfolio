import TransitionEffect from "@/components/TransitionEffect";

// Old Portfolio Project
const OldPortfolio = () => {
    return (
        <div className='border border-dark dark:border-light w-[95%] mx-auto p-0.5 my-5'>
            <TransitionEffect />
            <iframe
                src="./projects/oldportfolio/index.html"
                className="w-full h-[80vh]" />
        </div>

    );
};

export default OldPortfolio;