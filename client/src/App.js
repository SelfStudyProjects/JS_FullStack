import React, {Component} from 'react';
import './App.css';
import Customer from './components/customer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell'; 
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
  error: {
    margin: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  title: {
    color: theme.palette.primary.contrastText,
  }
});

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
    const { classes } = this.props;
    const { loading, error, customers } = this.state;

    if (loading) {
      return (
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" className={classes.error}>
          {error}
        </Alert>
      );
    }

    return (
      <div>
        <Box className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            고객 관리 시스템
          </Typography>
        </Box>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            {this.renderTableHeader()}
            {this.renderTableBody()}
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);