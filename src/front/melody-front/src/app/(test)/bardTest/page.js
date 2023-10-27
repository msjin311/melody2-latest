"use client"
import { useState } from 'react';
import ReactPlayer from "react-player";

function TestApi() {
    const [response, setResponse] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [question, setQuestion] = useState('');


    const fetchData = async () => {
        try {
            const dataToSend = {
                "question" : question
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
            console.log(data)
            console.log(data.body)

            const parsedData = JSON.parse(data.body);
            const audio_url = parsedData.audio_url;
            console.log(audio_url);
            // console.log(audio_url.)
            setAudioUrl(audio_url)

            setResponse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Test API Page</h1>
            <input
                type="text"
                placeholder="Enter your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)} // Update the question state
            />
            <button onClick={fetchData}>Fetch Data</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            {response &&  (
                <ReactPlayer url={audioUrl} controls />
            )}

        </div>
    );
}

export default TestApi;
