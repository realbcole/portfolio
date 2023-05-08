import TransitionEffect from "@/components/TransitionEffect";

// Audio Visualizer Project
const AudioVisualizer = () => {
    return (
        <div className='border border-dark dark:border-light w-[95%] mx-auto p-0.5 my-5'>
            <TransitionEffect />
            <iframe
                src="./projects/audiovisualizer/index.html"
                className="w-full h-[80vh]" />
        </div>

    );
};

export default AudioVisualizer;