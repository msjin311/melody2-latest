"use client"
import { useState } from 'react';
import ReactPlayer from "react-player";

function TestApi() {
    const [response, setResponse] = useState(null);

    const fetchData = async () => {
        try {
            const dataToSend = {
                "youtube_url" : "https://www.youtube.com/watch?v=F5oPDBO4bDE"
            };

            const res = await fetch('https://y5c1520fb4.execute-api.ap-northeast-2.amazonaws.com/melody-aws/api/getMusic2', {
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
            {console.log(response.body.mp3_url)}
            {response && response.mp3_url && (
                <ReactPlayer url={response.mp3_url} controls />
            )}



            {/*<ReactPlayer url= response/>*/}
        </div>
    );
}

export default TestApi;
