import { useState, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Modal,
  Box,
  Avatar,
  AvatarGroup,
  Container,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Restore as RestoreIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  Add as AddIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material'
import { ColorModeContext } from './main'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [navValue, setNavValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const colorMode = useContext(ColorModeContext)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Профиль" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  }

  return (
    <Box sx={{ pb: isMobile ? 7 : 0 }}>
      {/* AppBar with Navigation */}
      <AppBar position="sticky">
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI Demo
          </Typography>
          <IconButton 
            sx={{ mr: 1 }} 
            onClick={colorMode.toggleColorMode} 
            color="inherit"
            aria-label="toggle theme"
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>МУ</Avatar>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Container sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Material-UI Компоненты
        </Typography>
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          Mobile-First подход в действии
        </Typography>
        
        {/* Theme Toggle Info */}
        <Box sx={{ mb: 4 }}>
          <Card 
            sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
              color: 'primary.contrastText'
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {theme.palette.mode === 'dark' ? '🌙 Темная тема активна' : '☀️ Светлая тема активна'}
                  </Typography>
                  <Typography variant="body2">
                    Нажмите на иконку солнца/луны в правом верхнем углу для переключения темы
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Avatar Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Avatar (Аватары)
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Разные размеры:
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
                <Avatar>M</Avatar>
                <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
                <Avatar sx={{ width: 64, height: 64 }}>XL</Avatar>
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Группа аватаров:
              </Typography>
              <AvatarGroup max={4}>
                <Avatar alt="User 1" sx={{ bgcolor: '#f44336' }}>У1</Avatar>
                <Avatar alt="User 2" sx={{ bgcolor: '#e91e63' }}>У2</Avatar>
                <Avatar alt="User 3" sx={{ bgcolor: '#9c27b0' }}>У3</Avatar>
                <Avatar alt="User 4" sx={{ bgcolor: '#673ab7' }}>У4</Avatar>
                <Avatar alt="User 5" sx={{ bgcolor: '#3f51b5' }}>У5</Avatar>
              </AvatarGroup>
            </Box>
          </Stack>
        </Box>

        {/* Cards Grid */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Card (Карточки)
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2 
          }}>
            <Box>
              <Card>
                <CardMedia
                  sx={{ height: 140, bgcolor: 'primary.main' }}
                  title="Карточка 1"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Карточка 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Пример карточки с изображением, текстом и действиями.
                    Mobile-first дизайн адаптируется под экран.
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label="Новое" color="primary" size="small" />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<ShareIcon />}>
                    Поделиться
                  </Button>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
            <Box>
              <Card>
                <CardMedia
                  sx={{ height: 140, bgcolor: 'secondary.main' }}
                  title="Карточка 2"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Карточка 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Адаптивная сетка меняется: 1 колонка на мобильных, 
                    2 на планшетах, 3 на десктопах.
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label="Популярное" color="secondary" size="small" />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<ShareIcon />}>
                    Поделиться
                  </Button>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon color="error" />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
            <Box>
              <Card>
                <CardMedia
                  sx={{ height: 140, bgcolor: 'success.main' }}
                  title="Карточка 3"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Карточка 3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Нажмите на кнопку ниже, чтобы открыть модальное окно
                    и увидеть компонент Modal в действии.
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label="Интерактивная" color="success" size="small" />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleModalOpen}>
                    Открыть Modal
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* Component Info */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Дополнительные компоненты
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2 
          }}>
            <Box>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <MenuIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Drawer (Боковое меню)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Нажмите на иконку меню (☰) в верхнем левом углу, 
                    чтобы открыть боковое выдвижное меню.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <HomeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Navigation (Навигация)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isMobile 
                      ? 'На мобильных устройствах навигация отображается внизу экрана.'
                      : 'На больших экранах используйте меню в AppBar для навигации.'}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Modal Component */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Modal (Модальное окно)
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }} paragraph>
            Это модальное окно адаптируется под размер экрана.
            На мобильных устройствах оно занимает 90% ширины, 
            на больших экранах - фиксированную ширину.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" onClick={handleModalClose}>
              Закрыть
            </Button>
            <Button variant="outlined" onClick={handleModalClose}>
              Отмена
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <>
          <BottomNavigation
            showLabels
            value={navValue}
            onChange={(_event, newValue) => {
              setNavValue(newValue)
            }}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <BottomNavigationAction label="Главная" icon={<HomeIcon />} />
            <BottomNavigationAction label="История" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Избранное" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Место" icon={<LocationIcon />} />
          </BottomNavigation>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'fixed',
              bottom: 70,
              right: 16,
            }}
          >
            <AddIcon />
          </Fab>
        </>
      )}
    </Box>
  )
}

export default App
