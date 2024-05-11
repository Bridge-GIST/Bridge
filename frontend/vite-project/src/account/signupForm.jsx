import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../utils';

function SignupForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [tempMessage, setTempMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const csrfToken=getCookie('csrftoken');
        try {
            console.log(formData);
            const response = await axios.post(`http://localhost:8000/api/account/signup/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });
            setTimeout(() => {
                setTempMessage(''); // 2초 후 메시지 제거
            }, 10000);
            // 회원가입 성공 처리 로직
        } catch (error) {
            if (error.response && error.response.data) {
                // 서버로부터의 응답에 따라 오류 메시지 설정
                let error_msg = error.response.data;
                if (error_msg.username) {
                    setError(error_msg.username);
                } else if (error_msg.password) {
                    setError(error_msg.password);
                } else {
                    setError('회원가입 실패. 다시 시도해주세요.');
                }
            } else {
                setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
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
        <div className="signup-container">
            <div className='logo-img'>
                <div className='logo-span'>
                    <span className='logo-l'>
                        Bridge
                    </span>
                </div>
            </div>
            {tempMessage && <div className='error'>{tempMessage}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    className="signup-input"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="아이디"
                />
                <input
                    className="signup-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                />

                <button className="signup-button" type="submit">회원가입</button>
            </form>
            
        </div>
    );
  
}
export default SignupForm;