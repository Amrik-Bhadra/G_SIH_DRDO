import React from 'react';
import SideNavbar from '../../components/RacHeadComponents/SideNavbar';
import RacHeader from '../../components/RacHeadComponents/RacHeader';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const data = [
    {
        firstName: 'Aarav',
        middleName: 'Kumar',
        lastName: 'Sharma',
        fullname: 'Aarav Sharma',
        phoneNo: '9876543210',
        govtIdType: 'Aadhaar',
        govtIdNo: '1234 5678 9012',
        gender: 'Male',
        age: 35,
        recoveryEmail: 'aarav.sharma@example.com',
        designation: 'Senior Scientist',
        domain: 'Aerospace',
        yearsOfExperience: 12,
    },
];

const expertHistory=[
    {
        "jobRole": "Aerospace Systems Engineer",
        "panelId": "PANEL1234",
        "status": "Completed",
        "dateOfInterview": "2024-12-02",
        "domain": "Aerospace & Defense"
    },
    {
        "jobRole": "Embedded Systems Developer",
        "panelId": "PANEL5678",
        "status": "Completed",
        "dateOfInterview": "2024-12-01",
        "domain": "Electronics & Communication"
    },
    {
        "jobRole": "Radar Systems Analyst",
        "panelId": "PANEL2345",
        "status": "Upcoming",
        "dateOfInterview": "2024-12-11",
        "domain": "Radar & Surveillance"
    },
    {
        "jobRole": "Cybersecurity Specialist",
        "panelId": "PANEL9876",
        "status": "Upcoming",
        "dateOfInterview": "2024-12-09",
        "domain": "Cybersecurity & Encryption"
    },
    {
        "jobRole": "Propulsion Engineer",
        "panelId": "PANEL4321",
        "status": "Upcoming",
        "dateOfInterview": "2024-12-07",
        "domain": "Missile Propulsion Systems"
    }
]

const columns = [
    {
      width: 100,
      label: 'Job Role',
      dataKey: 'jobRole',
    },
    {
      width: 100,
      label: 'panel Id',
      dataKey: 'panelId',
    },
    {
      width: 50,
      label: 'Status',
      dataKey: 'status',
      numeric: true,
    },
    {
      width: 110,
      label: 'Date of Interview',
      dataKey: 'Date',
    },
    {
      width: 130,
      label: 'Domain',
      dataKey: 'domain',
    },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{ backgroundColor: 'background.paper' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 80,
            height: 80,
            fontSize: '1.5rem',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const ViewExpertPage = () => {
    return (
        <>
            <section className="h-screen w-screen flex bg-[#f6f6f6] overflow-y-auto">
            <SideNavbar />
                <main className="flex flex-col w-full gap-y-8">
                    <RacHeader />
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            margin: 4,
                            padding: 4,
                            width: '80vw',
                            height: 'calc(100vh - 96px)',
                            borderRadius: 2,
                            boxShadow: 2,
                        }}
                    >
                        <h2 className="font-medium text-xl mb-4">Expert Details</h2>
                        {data.map((candidate) => (
                            <Grid container spacing={4} key={candidate.fullname}>
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 2,
                                        
                                        padding: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Avatar className='shadow-md border border-4 border-white' {...stringAvatar(candidate.fullname)} style={{ width: '120px', height: '120px' }}/>
                                    <h4 className="mt-2 text-xl font-semibold text-gray-800">
                                        {candidate.fullname}
                                    </h4>
                                </Grid>
                                <Grid item xs={12} md={8} sx={{  padding: 8}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={5}>
                                            <TextField
                                                fullWidth
                                                label="Phone No"
                                                variant="outlined"
                                                value={candidate.phoneNo}
                                                disabled
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                    '& .Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                fullWidth
                                                label="Gender"
                                                variant="outlined"
                                                value={candidate.gender}
                                                disabled
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                    '& .Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                fullWidth
                                                label="Age"
                                                variant="outlined"
                                                value={candidate.age}
                                                disabled
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                    '& .Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                fullWidth
                                                label="Recovery Email"
                                                variant="outlined"
                                                value={candidate.recoveryEmail}
                                                disabled
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                    '& .Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                label="Experience"
                                                variant="outlined"
                                                value={candidate.yearsOfExperience}
                                                disabled
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                    '& .Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                fullWidth
                                                label="Domain"
                                                variant="outlined"
                                                value={candidate.domain}
                                                disabled
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                    '& .Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                fullWidth
                                                label="Designation"
                                                variant="outlined"
                                                value={candidate.designation}
                                                disabled
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                    '& .Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label={candidate.govtIdType}
                                                variant="outlined"
                                                value={candidate.govtIdNo}
                                                disabled
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                    '& .Mui-disabled': {
                                                        color: '#0E8CCA',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={expertHistory}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
                </main>
            </section>
        </>
    );
};

export default ViewExpertPage;
