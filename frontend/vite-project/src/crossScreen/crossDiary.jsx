import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './crossDiary.css';

function CrossDiary() {
    const [diary, setDiary]=useState(null);
    const { pk } = useParams();

    // axios로 /api/diary/:id/
    useEffect(() => {
        const fetchDiary = async () => {
            try {
                console.log(pk);
                const response = await axios.get(`http://localhost:8000/api/diary/user-diaries/${pk}`, {
                    withCredentials: true,
                });
                console.log(response);
                setDiary(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching diary:', error);
            }
        };
        fetchDiary();
    }, [pk]);

    if (!diary) {
        return <div>Loading...</div>;
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
