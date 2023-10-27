"use client"
import { useState } from 'react';
import ReactPlayer from "react-player";
import './ChatBot.css'; // Import your custom CSS

function TestApi() {
    const [response, setResponse] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [question, setQuestion] = useState('');

    const fetchData = async () => {
        try {
            const dataToSend = {
                "question": question, // Use the user's question from the state
            };

            const res = await fetch('https://mqco97wso7.execute-api.ap-northeast-2.amazonaws.com/bard-api/api/getBardAnswer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log(data);
            console.log(data.body);

            const parsedData = JSON.parse(data.body);
            const audio_url = parsedData.audio_url;
            const answer = parsedData.answer;
            console.log(audio_url);
            setAudioUrl(audio_url);
            // Update the answer state
            setAnswer(answer);

            setResponse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="chat-bot-container">
            <img src="/images/chat-helper.png" alt="Chat Bot" className="bot-image" />
            <h1>Chat Bot</h1>
            <div className="chat-window">
                {response && (
                    <div className="bot-response">
                        <p>{answer}</p>
                        {/*<pre>{JSON.stringify(response.body, null, 2)}</pre>*/}
                        {response && <ReactPlayer url={audioUrl} controls />}
                    </div>
                )}
            </div>
            <input
                type="text"
                placeholder="Enter your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={fetchData}>Ask</button>
        </div>
    );
}

export default TestApi;
