import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { getCookie } from '../utils';
import './MainScreenForm.css';

function MainScreenForm() {
  const [diaries, setDiaries] = useState([]);
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate(); // 네비게이션 함수 초기화

  useEffect(() => {
    const fetchAllDiaries = async () => {
      try {
        const user = localStorage.getItem('user');
        if (!user) {
          console.error('로그인이 필요합니다.');
          return;
        }
        const csrfToken = getCookie('csrftoken');
        const sessionid = getCookie('sessionid');
        const response = await axios.get('http://localhost:8000/api/diary/user-diaries', {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        setDiaries(response.data);
      } catch (error) {
        console.error('Error fetching all diaries:', error);
        setDiaries([]);
      }
    };

    fetchAllDiaries();
  }, []);

  const handleSearch = async () => {
    try {
      const csrfToken = getCookie('csrftoken');
      const response = await axios.get(`http://localhost:8000/api/search-diary/?query=${query}&date=${date}`, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrfToken
        },
      });
      setDiaries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDiaries([]);
    }
  };
  const handleRowClick = (diaryId) => {
    navigate(`/cross/${diaryId}`);
  };

  // "일기 쓰기" 버튼 클릭 시 diaryWrite 페이지로 이동
  const handleWriteDiary = () => {
    navigate('/write'); // navigate 함수를 사용하여 경로 이동
  };

  return (
    <div className="app-container">
        <div className="top-bar">
            <div>
                <h1 className="bridge-title"><span className='color'>B</span>ridges</h1>
                <p className="subtitle">나의 불안을 긍정으로</p>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="제목으로 검색하기"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <input
                    type="date"
                    className="search-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={handleSearch} className="search-button">검색</button>
            </div>
            <button onClick={handleWriteDiary} className="write-button">일기 쓰기</button>
        </div>
        <div className='may'>
          <p>2024년 <span className='color'>5월</span></p>
        </div>
        {diaries.length > 0 ? (
            <div className="diary-table-container">
                <table className="diary-table">
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>제목</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                      {diaries.map((diary) => (
                        <tr key={diary.id} onClick={() => handleRowClick(diary.id)} style={{ cursor: 'pointer' }}>
                          <td>{new Date(diary.created_at).toLocaleDateString()}</td>
                          <td>{diary.title}</td>
                          <td>{diary.content.slice(0, 30)}{diary.content.length > 30 ? '...' : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="no-diaries-message">
                <p>작성된 일기가 없습니다. 일기를 작성해주세요!</p>
            </div>
        )}
    </div>
);
}

export default MainScreenForm;
