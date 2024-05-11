import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CrossDiary.css';

function CrossDiary() {
    const { state } = useLocation();
    const [diary, setDiary] = useState(state ? state.diary : null);
    const [loading, setLoading] = useState(!state);

    useEffect(() => {
        if (!diary) {
            setLoading(true);
            axios.get('http://localhost:8000/api/diary-url') // You need to replace '/api/diary-url' with actual API endpoint
                .then(response => {
                    setDiary(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('There was an error fetching the diary data:', error);
                    setLoading(false);
                });
        }
    }, [diary]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!diary) {
        return <div>Diary not found.</div>;
    }

    return (
        <div className="cross-diary-container">
            <h1 className="title-style">Bridges</h1>
            <div className="diary-display">
                <div className="original-diary">
                    <h2>원본 일기</h2>
                    <p><b>제목:</b> {diary.title}</p>
                    <p><b>내용:</b> {diary.content}</p>
                    <p><b>수면 시간:</b> {diary.sleep_hour} hours</p>
                </div>
                <div className="positive-diary">
                    <h2>긍정 일기</h2>
                    <p><b>제목:</b> {diary.title}</p>
                    <p><b>내용:</b> {diary.gpt_content}</p>
                </div>
            </div>
        </div>
    );
}

export default CrossDiary;
