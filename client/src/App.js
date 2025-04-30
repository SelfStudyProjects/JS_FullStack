import React, {Component} from 'react';
import './App.css';
import Customer from './components/customer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell'; 
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  overflowX: 'auto',
}));

const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledLoadingBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
});

const StyledErrorAlert = styled(Alert)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const StyledHeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

class App extends Component {
  state = {
    customers: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      const data = await response.json();
      this.setState({ 
        customers: data,
        loading: false,
        error: null
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: '고객 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.'
      });
    }
  };

  renderTableHeader = () => (
    <TableHead>
      <TableRow>
        <TableCell>번호</TableCell>
        <TableCell>이미지</TableCell>
        <TableCell>이름</TableCell>
        <TableCell>생년월일</TableCell>
        <TableCell>성별</TableCell>
        <TableCell>직업</TableCell>
      </TableRow>
    </TableHead>
  );

  renderTableBody = () => {
    const { customers } = this.state;
    return (
      <TableBody>
        {customers.map(customer => (
          <Customer
            key={customer.id}
            id={customer.id}
            image={customer.image}
            name={customer.name}
            birthday={customer.birthday}
            gender={customer.gender}
            job={customer.job}
          />
        ))}
      </TableBody>
    );
  };

  render() {
    const { loading, error, customers } = this.state;

    if (loading) {
      return (
        <StyledLoadingBox>
          <CircularProgress />
        </StyledLoadingBox>
      );
    }

    if (error) {
      return (
        <StyledErrorAlert severity="error">
          {error}
        </StyledErrorAlert>
      );
    }

    return (
      <div>
        <StyledHeaderBox>
          <StyledTitle variant="h4">
            고객 관리 시스템
          </StyledTitle>
        </StyledHeaderBox>
        <StyledPaper>
          <StyledTable>
            {this.renderTableHeader()}
            {this.renderTableBody()}
          </StyledTable>
        </StyledPaper>
      </div>
    );
  }
}

export default App;