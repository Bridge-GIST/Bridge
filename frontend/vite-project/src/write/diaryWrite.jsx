import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './diaryWrite.css';

function DiaryWrite() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // 일기 제출 및 긍정 일기 변환 요청
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        if (!user) {
            console.error('로그인이 필요합니다.');
            return;
        }

        try {
            // 일기 데이터를 백엔드로 전송하고 응답을 받음
            const response = await axios.post('/api/create-diary/', {
                title, content
            }, {
                withCredentials: true
            });

            // crossDiary 컴포넌트로 네비게이션, 일기 데이터를 상태로 전달
            navigate('/crossScreen', { state: { diary: response.data } });
        } catch (error) {
            console.error('일기 제출 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div className="diary-write-container">
            <div className="top-section">
                <h1 className="bridge-title"><span className="main-part">B</span>ridges</h1>
                <p className="subtitle">나의 불안을 긍정으로</p>
            </div>
            <div className="diary-section">
                <h2 className="diary-heading">Diary</h2>
                <form onSubmit={handleSubmit} className="diary-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">제목:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="일기 제목을 입력하세요"
                            className="diary-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content" className="form-label">내용:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="일기 내용을 입력하세요"
                            className="diary-textarea"
                        />
                    </div>
                    <button type="submit" className="submit-button">제출하기</button>
                </form>
            </div>
        </div>
    );
}

export default DiaryWrite;
