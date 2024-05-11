import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
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
        const response = await axios.get('http://127.0.0.1:8000/api/diary/user-diaries', {
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
      const response = await axios.get(`http://127.0.0.1:8000/api/search-diary/?query=${query}&date=${date}`, {
        withCredentials: true
      });
      setDiaries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDiaries([]);
    }
  };

  // "일기 쓰기" 버튼 클릭 시 diaryWrite 페이지로 이동
  const handleWriteDiary = () => {
    navigate('/write/diaryWrite'); // navigate 함수를 사용하여 경로 이동
  };

  return (
    <div>
      <h1 className="title-style">Bridges</h1>
      <div className="search-inputs">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="date"
          className="search-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleWriteDiary} className="write-diary-button">일기 쓰기</button> {/* 일기 쓰기 버튼 추가 */}
      </div>

      {diaries.length > 0 ? (
        <div className="diary-table-container">
          <table className="diary-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {diaries.map(diary => (
                <tr key={diary.id}>
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
