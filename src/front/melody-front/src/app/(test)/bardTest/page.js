"use client"
import { useState } from 'react';
import ReactPlayer from "react-player";

function TestApi() {
    const [response, setResponse] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);


    const fetchData = async () => {
        try {
            const dataToSend = {
                "question" : "비 오는데 노래 추천좀 해줘 한 3곡 정도 한국 곡으로만"
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
            <button onClick={fetchData}>Fetch Data</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            {response &&  (
                <ReactPlayer url={audioUrl} controls />
            )}

        </div>
    );
}

export default TestApi;
