import React from 'react';
import { useLocation } from 'react-router-dom';
import './CrossDiary.css';

function CrossDiary() {
    const { state } = useLocation();
    const { diary } = state;

    return (
        <div className="cross-diary-container">
            <h1 className="title-style">Bridges</h1>
            <div className="diary-display">
                <div className="original-diary">
                    <h2>원본 일기</h2>
                    <p><b>제목:</b> {diary.title}</p>
                    <p><b>내용:</b> {diary.content}</p>
                </div>
                <div className="positive-diary">
                    <h2>긍정 일기</h2>
                    <p><b>제목:</b> {diary.title}</p>
                    <p><b>내용:</b> {diary.positive_content}</p>
                </div>
            </div>
        </div>
    );
}

export default CrossDiary;
