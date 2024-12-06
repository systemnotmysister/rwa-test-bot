import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Константы
axios.defaults.baseURL = 'https://atico-bot-dev-k32smuadja-ew.a.run.app';

// Типы данных
export type UserDataType = {
  farmingLevel: number;
  accumulationLevel: number;
  farmingBalance: number;
  availableClaimAmount: number;
  username: string | null;
  firstName: string | null;
  languageCode: string | null;
  addedToAttachmentMenu: boolean;
  allowsWriteToPm: boolean;
  photoUrl: string | null;
  chatId: string | null;
  referralCode: string | null;
  sponsorId: string | null;
  friendsCount: number;
  createdAt: string | null;
  farmingPerHour: number;
  accumulationDuration: number;
  lastClaimAt: string | null;
  bot: boolean;
  premium: boolean;
};

export type NextLevelRuleType = {
  level: number;
  speed: number;
  cost: number;
};

export type ConfigDataType = {
  farmingRules: { level: number; speed: number; cost: number }[];
  accumulationRules: { level: number; duration: number; cost: number }[];
};

export type AppContextType = {
  nextLevelRule: NextLevelRuleType | null;
  setNextLevelRule: (rule: NextLevelRuleType | null) => void;
  currentFarmingRule: NextLevelRuleType | null;
  setCurrentFarmingRule: (rule: NextLevelRuleType | null) => void;
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
  configData: ConfigDataType;
  setConfigData: React.Dispatch<React.SetStateAction<ConfigDataType>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  findNextLevelRule: (level: number) => NextLevelRuleType | null;
  initializeUser: (userData: any, initData: string) => Promise<void>;
  fetchConfigData: () => Promise<void>;
  setInitData: (data: string) => void;
  initData: string;
};

const defaultUserData: UserDataType = {
  farmingLevel: 0,
  accumulationLevel: 0,
  farmingBalance: 0,
  availableClaimAmount: 0,
  username: null,
  firstName: null,
  languageCode: null,
  addedToAttachmentMenu: false,
  allowsWriteToPm: false,
  photoUrl: null,
  chatId: null,
  referralCode: null,
  sponsorId: null,
  friendsCount: 0,
  createdAt: null,
  farmingPerHour: 0,
  accumulationDuration: 0,
  lastClaimAt: null,
  bot: false,
  premium: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [configData, setConfigData] = useState<ConfigDataType>({ farmingRules: [], accumulationRules: [] });
  const [userData, setUserData] = useState<UserDataType>(defaultUserData);
  const [nextLevelRule, setNextLevelRule] = useState<NextLevelRuleType | null>(null);
  const [currentFarmingRule, setCurrentFarmingRule] = useState<NextLevelRuleType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initData, setInitData] = useState<string>('');
  /**
   * Функция для поиска правила для следующего уровня.
   */
  const findNextLevelRule = (currentLevel: number): NextLevelRuleType | null => {
    const nextLevel = currentLevel + 1; // Определяем следующий уровень
    const rule = configData.farmingRules.find(rule => rule.level === nextLevel);
    setNextLevelRule(rule || null); // Устанавливаем правило или null, если не найдено
    return rule || null;
  };
  /**
   * Обновление данных `nextLevelRule` в зависимости от уровня пользователя.
   */
  const updateNextLevelRule = (farmingLevel: number) => {
    findNextLevelRule(farmingLevel);
  };
  /**
   * Получение данных конфигурации.
   */
  const fetchConfigData = async () => {
    try {
      const configDataRes = await axios.get(`/api/v1/config`);
      console.log('Fetched config data:', configDataRes.data);
      setConfigData(configDataRes.data.data);

      // Инициализируем nextLevelRule, если уровень пользователя больше 0
      if (userData.farmingLevel > 0) {
        updateNextLevelRule(userData.farmingLevel);
      }
    } catch (error) {
      console.error('Failed to fetch config data:', error);
    }
  };
  /**
   * Инициализация данных пользователя.
   */
  const initializeUser = async (initData: string) => {
    setIsLoading(true); 
    try {
      const userDataRes = await axios.post(`/api/v1/user`, userData, {
        headers: { 'Content-Type': 'application/json', Authorization: initData },
      });
      setUserData(userDataRes.data.data); // Обновляем данные пользователя
      console.log('Fetched user data:', userDataRes.data);
      console.log('Fetched user data:', userDataRes.data.data.photoUrl);

      // Обновляем `nextLevelRule` на основе уровня пользователя
      updateNextLevelRule(userDataRes.data.data.farmingLevel);
    } catch (error) {
      console.error('Error initializing user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Эффект: обновляем `nextLevelRule`, если меняется уровень пользователя или данные конфигурации.
   */
  useEffect(() => {
    if (userData.farmingLevel > 0 && configData.farmingRules.length > 0) {
      updateNextLevelRule(userData.farmingLevel);
    }
  }, [userData.farmingLevel, configData.farmingRules]);

  /**
   * Эффект: загрузка конфигурации при монтировании.
   */
  useEffect(() => {
    fetchConfigData();
  }, []);

  /**
   * Эффект: инициализация пользователя, если есть `initData`.
   */
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initDataString = window.Telegram.WebApp.initData || '';
      setInitData(initDataString);

      if (initDataString) {
        initializeUser(initDataString);
      } else {
        console.warn('initData is missing');
      }
    } else {
      console.warn('Telegram WebApp not found');
    }
  }, [initData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        configData,
        setConfigData,
        nextLevelRule,
        setNextLevelRule,
        currentFarmingRule,
        setCurrentFarmingRule,
        isLoading,
        setIsLoading,
        findNextLevelRule,
        initializeUser,
        fetchConfigData,
        setInitData,
        initData,
      }}
    >
      {children}
      
    </AppContext.Provider>
    )
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
