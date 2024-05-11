import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { getCookie } from '../utils';
import { removeCookie } from '../utils';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const [tempMessage, setTempMessage] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const csrfToken=getCookie('csrftoken');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            withCredentials: true
        };
        axios.post("http://localhost:8000/api/account/login/", {
            username,
            password
        }, config)
        .then((response) => {
            localStorage.setItem('user', JSON.stringify({ username: username }));
            setUser({ username: username });
            navigate('/');
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                setError(error.response.data.error || '로그인 실패. 다시 시도해주세요.');
            } else {
                setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
        });
    };

    const showTempMessage = (error) => {
        setTempMessage(error); // 메시지 설정
        setTimeout(() => {
            setTempMessage(''); // 2초 후 메시지 제거
        }, 1500);
    };

    useEffect(() => {
        if (error) {
            showTempMessage(error);
        }
    }, [error]);

    return (
        <div className='login-container'>
            <div className='logo'>
                <span>Bridge</span>
            </div>
            {tempMessage && <div className='error'>{tempMessage}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="아이디"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <button type="submit">로그인</button>
            </form>
            <Link to="/signup" className='signup-link'>
                <p>Bridge에 처음이신가요? <span style={{color:"#4CA771", marginLeft:"1rem"}}>회원가입</span></p>
            </Link>
        </div>
    );
}

export default LoginForm;