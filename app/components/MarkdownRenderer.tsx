import type React from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css"

interface MarkdownRendererProps {
    content: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="markdown-body bg-white p-6 rounded-lg shadow-md">
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4 pb-2 border-b" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 leading-6" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-8 mb-4" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-8 mb-4" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                    code: ({ node, ...props }) =>
                    (
                        <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                    ),
                    a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                    img: ({ node, ...props }) => <img className="max-w-full h-auto my-4" {...props} />,
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 my-4" {...props} />
                        </div>
                    ),
                    th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 bg-gray-100" {...props} />,
                    td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default MarkdownRenderer

