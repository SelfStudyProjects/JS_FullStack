import React, { useState, useEffect } from 'react';
import './App.css';
import Customer from './components/customer';
import CustomerAdd from './components/customerAdd';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// 스타일을 한 곳에 모아 관리
const styles = {
  appBarBox: { flexGrow: 1 },
  paper: {
    width: 'auto',
    overflowX: 'auto',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 2,
    marginBottom: 2
  },
  table: { minWidth: 1080, width: '100%' },
  tableCell: { width: '14.28%' },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 1
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15
  }
};

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompleted((prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 1));
    }, 20);

    fetchCustomers();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      const data = await response.json();
      setCustomers(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError('고객 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const stateRefresh = () => {
    setCustomers([]);
    setCompleted(0);
    fetchCustomers();
  };

  const filteredCustomers = customers.filter(customer => {
    return customer.name.indexOf(searchKeyword) > -1;
  });

  // Drawer 열기/닫기 함수
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Drawer 내부 메뉴 예시
  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="고객 목록">
          <ListItemText primary="고객 목록" />
        </ListItem>
        <ListItem button key="고객 추가">
          <ListItemText primary="고객 추가" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={styles.appBarBox}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              고객 관리 시스템
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="검색하기"
              value={searchKeyword}
              onChange={handleValueChange}
              sx={styles.searchInput}
            />
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerList}
        </Drawer>
      </Box>
      <div style={styles.menu}>
        <CustomerAdd stateRefresh={stateRefresh}/>
      </div>
      <Paper sx={styles.paper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableCell}>번호</TableCell>
              <TableCell sx={styles.tableCell}>이미지</TableCell>
              <TableCell sx={styles.tableCell}>이름</TableCell>
              <TableCell sx={styles.tableCell}>생년월일</TableCell>
              <TableCell sx={styles.tableCell}>성별</TableCell>
              <TableCell sx={styles.tableCell}>직업</TableCell>
              <TableCell sx={styles.tableCell}>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell sx={styles.tableCell} colSpan={7} align="center">
                  <CircularProgress variant="determinate" value={completed} />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell sx={styles.tableCell} colSpan={7} align="center">
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell sx={styles.tableCell} colSpan={7} align="center">
                  등록된 고객이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map(customer => (
                <Customer
                  key={customer.id}
                  id={customer.id}
                  image={customer.image}
                  name={customer.name}
                  birthday={customer.birthday}
                  gender={customer.gender}
                  job={customer.job}
                  stateRefresh={stateRefresh}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default App;