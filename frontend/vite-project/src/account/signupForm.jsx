import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../utils';
import './account.css';
import {useNavigate} from 'react-router-dom';

function SignupForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '', // 비밀번호 확인을 위한 상태 추가
    });
    const [error, setError] = useState('');
    const [tempMessage, setTempMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 비밀번호와 비밀번호 확인이 일치하는지 검사
        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        const csrfToken = getCookie('csrftoken');
        try {
            console.log(formData);
            const response = await axios.post(`http://localhost:8000/api/account/signup/`, {
                username: formData.username,
                password: formData.password,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });
            setTimeout(() => {
                setTempMessage(''); // 메시지 제거
            }, 10000);
            navigate('/login');
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
        }, 4000);
    };

    useEffect(() => {
        if (error) {
            showTempMessage(error);
        }
    }, [error]);

    return (
        <div className="signup-container">
            <div className='logo'>
                <span>회원가입1</span>
            </div>
            <p className='signup-intro'>지금 <span className='color'>Bridge</span>에 회원가입하여<br/> 불안을 기록하고, 해결해보세요</p>
            {tempMessage && <div className='error'>{tempMessage}</div>}
            <form onSubmit={handleSubmit}>
                <p className='input-name'>아이디(닉네임)</p>
                <input
                    className="signup-input"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <p className='para'>· 5-20자이내의 영문, 숫자와 언더바만 가능합니다.</p>
                <p className='input-name'>비밀번호</p>
                <input
                    className="signup-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <p className='para'>· 비밀번호는 최소 8자 이상이어야합니다.<br/>· 숫자로만 이루어진 비밀번호는 사용할 수 없습니다.</p>
                <p className='input-name'>비밀번호 확인</p>
                <input
                    className="signup-input"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <p className='para'>· 확인을 위해 동일한 비밀번호를 입력해주세요.</p>

                <button className="signup-button" type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default SignupForm;
