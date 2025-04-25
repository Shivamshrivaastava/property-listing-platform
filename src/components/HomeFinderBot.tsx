import React, { useState } from 'react';

const HomeFinderBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [showStaging, setShowStaging] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const sanitizeResponse = (text: string) => {

    return text
      .replace(/\*/g, '') // remove asterisks
      .replace(/\n/g, '<br/>'); // convert line breaks to <br/>
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const lowerQuery = query.toLowerCase();
    const isStagingQuery =
      lowerQuery.includes('decorate') ||
      lowerQuery.includes('layout') ||
      lowerQuery.includes('furnish') ||
      lowerQuery.includes('stage') ||
      lowerQuery.includes('arrange');

    const isPropertyQuery =
      lowerQuery.includes('property') ||
      lowerQuery.includes('house') ||
      lowerQuery.includes('home') ||
      lowerQuery.includes('apartment') ||
      lowerQuery.includes('buy') ||
      lowerQuery.includes('sell') ||
      lowerQuery.includes('rent') ||
      lowerQuery.includes('location') ||
      lowerQuery.includes('price');

    setExpanded(true);

    const prompt = `
You are HomeFinder Bot. You help users find homes and visualize room staging. Only answer if it's about:
- Property search
- Decorating or staging rooms
- Layouts and furniture suggestions

If not, respond: "I'm here only to help with property and staging queries."

User: ${query}
`;

    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDGI7L3yA_9DxpXKCma2k0qFblHaZzZI7U',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
    const cleanReply = sanitizeResponse(rawReply);

    setResponse(cleanReply);
    setShowStaging(isStagingQuery);

    if (isStagingQuery || isPropertyQuery) {
      setTimeout(() => {
        setOpen(false);
        setResponse('');
        setQuery('');
        setShowStaging(false);
        setExpanded(false);
      }, 30000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-16 h-16 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 flex items-center justify-center text-xl"
        >
          💬
        </button>
      )}

      {open && (
        <div
          className={`transition-all duration-300 ${expanded ? 'w-96 h-auto' : 'w-80'
            } bg-white rounded-lg shadow-lg p-4 border border-gray-300`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-primary-600">HomeFinder Bot</h3>
            <button onClick={() => setOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">
              ✖
            </button>
          </div>

          <div
            className="text-sm text-gray-700 max-h-48 overflow-y-auto border p-2 rounded mb-3 bg-gray-50"
            dangerouslySetInnerHTML={{
              __html: response || 'Hi! Ask me about homes or room staging.',
            }}
          />

          {showStaging && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 font-medium mb-1">Suggested layouts:</p>
              <div className="flex gap-2 overflow-x-auto">
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                  alt="Layout 1"
                  className="w-24 h-20 object-cover rounded shadow"
                />
                <img
                  src="https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg"
                  alt="Layout 2"
                  className="w-24 h-20 object-cover rounded shadow"
                />
                <img
                  src="https://images.pexels.com/photos/271800/pexels-photo-271800.jpeg"
                  alt="Layout 3"
                  className="w-24 h-20 object-cover rounded shadow"
                />
              </div>
            </div>
          )}


          <input
            type="text"
            className="w-full border px-2 py-1 rounded mb-2"
            placeholder="Ask about layout or decor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="w-full bg-primary-600 text-white py-1 rounded hover:bg-primary-700"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeFinderBot;
