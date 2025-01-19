const PostPreview = ({ content, maxLength = 150 }: { content: string; maxLength?: number }) => {
    // Strip HTML tags and ensure line breaks are preserved
    const stripHtml = (html: string) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    };
  
    return (
      <p className="text-gray-500 dark:text-gray-400 mb-4 break-words whitespace-normal text-wrap overflow-wrap-anywhere">
        {stripHtml(content).slice(0, maxLength)}...
      </p>
    );
  };

  export default PostPreview;