import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeMathjax from 'rehype-mathjax';
import remarkGfm from 'remark-gfm';

interface TabContentProps {
  activeTab: string;
  topicId: number;
}

export function TabContent({ activeTab, topicId }: TabContentProps) {
  const [markdownContent, setMarkdownContent] = React.useState<string>('');

  React.useEffect(() => {
    // For now, we'll use a static markdown file from public folder
    let path = "";

    switch (activeTab) {
      case 'book':
        path = `/motion-in-straight-line.md`;
        break;
      case 'notes':
        path = `/motion-in-straight-line-notes.md`;
        break;
      case 'questionBank':
        path = `/motion-in-straight-line-questions.md`;
        break;
    }

    fetch(path)
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => console.error('Error loading markdown file:', error));
  }, [activeTab]);

  const renderContent = () => {
    if (activeTab === 'book' || activeTab === 'notes' || activeTab === 'questionBank') {
      return (
        <div className="prose max-w-none p-4 dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeMathjax, rehypeRaw]}
            urlTransform={(url: string) => url}
            components={{
              img: ({ node, ...props }) => <img {...props} className="max-w-full" />,
              table: ({ node, ...props }) => <table {...props} className="border-collapse table-auto w-full" />,
              th: ({ node, ...props }) => <th {...props} className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left" />,
              td: ({ node, ...props }) => <td {...props} className="border border-slate-300 dark:border-slate-700 px-4 py-2" />
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      )
    } else {
      return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {renderContent()}
    </div>
  );
} 