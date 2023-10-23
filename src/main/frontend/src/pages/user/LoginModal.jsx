import {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from "react-bootstrap/Nav";
import {Form} from "react-bootstrap";
import {UserContext} from "../../contexts/user/UserContext.jsx";

// eslint-disable-next-line react/prop-types
function LoginModal({onLoginSuccess}) { // prop onLogin 추가 : 로그인 submit 시 동작

    const [show, setShow] = useState(false);
    const {user, setUser} = useContext(UserContext);


    const handleChange = (e) => {
        // const { name, value } = e.target;
        setUser(prev =>({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // 사용자 정보 호출 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 여기서 formData를 사용하여 로그인 로직을 처리하거나 서버에 요청을 보낼 수 있습니다.
        console.log('Submitted Data:', user);
        // 예: await fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) });
        try {
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const userData = await response.json();

                console.log("Login OK!!!", userData);
                setUser(userData);
                onLoginSuccess();
                handleClose();

            } else console.log('Login failed! Totally!!');

        } catch (error) {
            console.error(error);
        }

    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Nav.Link style={{paddingRight: '10px'}} onClick={handleShow}>
                    로그인
            </Nav.Link>

            <Modal show={show} onHide={handleClose}>

                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>로그인</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Form.Group className="mb-3" controlId="userId">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="text" placeholder="아이디를 입력해 주세요." name="userId" onChange={handleChange} />
                                <Form.Text className="text-muted">
                                    {/* 여기서 validation check 문구 return 가능할듯. */}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password" onChange={handleChange}>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호를 입력해 주세요." name="password" onChange={handleChange} />
                                <Form.Text className="text-muted">
                                    {/* 여기서 validation check 문구 return 가능할듯. */}
                                </Form.Text>
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            취소
                        </Button>
                        <Button type="submit" variant="primary">
                            로그인
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default LoginModal;