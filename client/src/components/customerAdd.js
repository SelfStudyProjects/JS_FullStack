import React from 'react';
import axios from 'axios';
import { 
    TextField, 
    Button, 
    Box, 
    Typography, 
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            error: null,
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({ 
            open: true 
        });
    }

    handleClose = () => {
        this.setState({ 
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
         });
    }
    
    

    handleFormSubmit = (e) => {
        e.preventDefault();
        
        // 유효성 검사
        if (!this.state.userName || !this.state.birthday || !this.state.gender || !this.state.job) {
            this.setState({ error: '모든 필드를 입력해주세요.' });
            return;
        }

        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        axios.post('/api/customers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('성공:', response);
            this.setState({
                file: null,
                userName: '',
                birthday: '',
                gender: '',
                job: '',
                fileName: '',
                error: null
            });
            this.props.stateRefresh();
        })
        .catch(error => {
            console.error('에러:', error);
            this.setState({ error: '고객 추가 중 오류가 발생했습니다.' });
        });
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>고객 추가</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <TextField type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                        <TextField type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} />
                        <TextField type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                        <TextField type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                    </DialogContent>
                </Dialog>

                {/* 
                <Box component="form" onSubmit={this.handleFormSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        고객 추가
                    </Typography>
                    {this.state.error && (
                        <Typography color="error" gutterBottom>
                            {this.state.error}
                        </Typography>
                    )}
                    <FormControl fullWidth margin="normal">
                        <Button
                            variant="outlined"
                            component="label"
                        >
                            프로필 이미지 선택
                            <input
                                type="file"
                                hidden
                                onChange={this.handleFileChange}
                            />
                        </Button>
                        {this.state.fileName && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                선택된 파일: {this.state.fileName}
                            </Typography>
                        )}
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="이름"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleValueChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="생년월일"
                        name="birthday"
                        value={this.state.birthday}
                        onChange={this.handleValueChange}
                        placeholder="YYMMDD"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>성별</InputLabel>
                        <Select
                            name="gender"
                            value={this.state.gender}
                            onChange={this.handleValueChange}
                            label="성별"
                        >
                            <MenuItem value="남자">남자</MenuItem>
                            <MenuItem value="여자">여자</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="직업"
                        name="job"
                        value={this.state.job}
                        onChange={this.handleValueChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        추가하기
                    </Button>
                </Box>
                */}
            </div>
        );
    }

}

export default CustomerAdd;
