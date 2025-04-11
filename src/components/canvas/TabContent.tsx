import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface TabContentProps {
  activeTab: string;
  topicId: number;
}

export function TabContent({ activeTab, topicId }: TabContentProps) {
  const [markdownContent, setMarkdownContent] = React.useState<string>('');

  React.useEffect(() => {
    // For now, we'll use a static markdown file from public folder
    fetch('/ai-notes.md')
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => console.error('Error loading markdown file:', error));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'book':
        return (
          <div className="prose max-w-none p-4 dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        );
      case 'notes':
        return (
          <div className="prose max-w-none p-4 dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        );
      case 'questionBank':
        return (
          <div className="prose max-w-none p-4 dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {renderContent()}
    </div>
  );
} 