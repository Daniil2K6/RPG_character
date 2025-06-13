import { Box, Tabs, Tab, TextField, IconButton, Button } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';
import type { CustomTab } from '../types/character';

interface TabPanelProps {
  tabs: CustomTab[];
  onTabsChange: (tabs: CustomTab[]) => void;
  readonly?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  tabs,
  onTabsChange,
  readonly = false,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]?.id || '');
  const [newTabTitle, setNewTabTitle] = useState('');
  const [isAddingTab, setIsAddingTab] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTabs = tabs.map(tab =>
      tab.id === selectedTab
        ? { ...tab, content: event.target.value }
        : tab
    );
    onTabsChange(newTabs);
  };

  const handleAddTab = () => {
    if (!newTabTitle.trim()) return;
    
    const newTab: CustomTab = {
      id: crypto.randomUUID(),
      title: newTabTitle,
      content: ''
    };
    
    onTabsChange([...tabs, newTab]);
    setSelectedTab(newTab.id);
    setNewTabTitle('');
    setIsAddingTab(false);
  };

  const handleDeleteTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    if (selectedTab === tabId) {
      setSelectedTab(newTabs[0]?.id || '');
    }
    onTabsChange(newTabs);
  };

  const selectedTabContent = tabs.find(tab => tab.id === selectedTab)?.content || '';

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flex: 1 }}
          >
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {tab.title}
                    {!readonly && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTab(tab.id);
                        }}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                }
                value={tab.id}
              />
            ))}
          </Tabs>
          {!readonly && (
            <Button
              startIcon={<AddIcon />}
              onClick={() => setIsAddingTab(true)}
              sx={{ ml: 1 }}
            >
              Добавить
            </Button>
          )}
        </Box>
      </Box>

      {isAddingTab && (
        <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={newTabTitle}
            onChange={(e) => setNewTabTitle(e.target.value)}
            placeholder="Название вкладки"
          />
          <Button onClick={handleAddTab} variant="contained">
            Создать
          </Button>
          <Button onClick={() => setIsAddingTab(false)}>
            Отмена
          </Button>
        </Box>
      )}

      <TextField
        fullWidth
        multiline
        minRows={8}
        maxRows={20}
        value={selectedTabContent}
        onChange={handleContentChange}
        disabled={readonly || !selectedTab}
        placeholder={!selectedTab ? 'Выберите вкладку' : 'Введите текст...'}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }
        }}
      />
    </Box>
  );
}; 