import { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';

export const Timer: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        padding: 2,
        minWidth: 200,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <Typography variant="h4">
        {time.toLocaleTimeString()}
      </Typography>
      <Typography variant="subtitle2">
        {time.toLocaleDateString()}
      </Typography>
    </Paper>
  );
}; 