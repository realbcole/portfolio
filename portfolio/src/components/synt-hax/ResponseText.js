import React from 'react';
import ReactMarkdown from 'react-markdown';

// Formats the response text
const ResponseText = ({ responseText }) => {
    // Find code sections enclosed in triple backticks
    const codeSections = responseText.match(/```[\s\S]+?```/g);

    if (codeSections) {
        codeSections.forEach(codeSection => {
            // Replace code sections with formatted Markdown code blocks
            responseText = responseText.replace(codeSection, `\n\n${codeSection
                }\n\n`);
        });
    }
    return (
        <ReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    return (
                        <code className="text-primaryDark" {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >{responseText}</ReactMarkdown>
    );
};
export default ResponseText;
