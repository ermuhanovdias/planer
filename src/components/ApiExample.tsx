import { Box, Card, CardContent, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useApi } from '../hooks/useApi';

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export default function ApiExample() {
  const { data, loading, error, refetch } = useApi<ApiResponse>({
    endpoint: '/versions',
    autoFetch: true,
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Защищенный API Endpoint
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Этот компонент демонстрирует работу с защищенным API. Запрос автоматически включает JWT токен.
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {data && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              API Request successful! Token is valid.
            </Alert>
            <Typography variant="body2" component="pre" sx={{ 
              bgcolor: 'background.default', 
              p: 2, 
              borderRadius: 1,
              overflow: 'auto',
              maxHeight: 300
            }}>
              {JSON.stringify(data, null, 2)}
            </Typography>
          </Box>
        )}

        <Button 
          variant="outlined" 
          onClick={refetch} 
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Refetch Data
        </Button>
      </CardContent>
    </Card>
  );
}

