import TransitionEffect from "@/components/TransitionEffect";

// Meal Finder Project
const MealFinder = () => {
    return (
        <div className='border border-dark dark:border-light w-[95%] mx-auto p-0.5 my-5'>
            <TransitionEffect />
            <iframe
                src="./projects/mealfinder/index.html"
                className="w-full h-[80vh]" />
        </div>

    );
};

export default MealFinder;