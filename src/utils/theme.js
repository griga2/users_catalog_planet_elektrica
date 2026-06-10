import { darkTheme, lightTheme } from 'naive-ui'

export const themeOverrides = {
  common: {
    primaryColor: '#2563EB',
    primaryColorHover: '#1D4ED8',
    primaryColorPressed: '#1E40AF',
    primaryColorSuppl: '#3B82F6',
    
    infoColor: '#3B82F6',
    infoColorHover: '#2563EB',
    infoColorPressed: '#1D4ED8',
    infoColorSuppl: '#60A5FA',
    
    successColor: '#10B981',
    successColorHover: '#059669',
    successColorPressed: '#047857',
    successColorSuppl: '#34D399',
    
    warningColor: '#F59E0B',
    warningColorHover: '#D97706',
    warningColorPressed: '#B45309',
    warningColorSuppl: '#FBBF24',
    
    errorColor: '#EF4444',
    errorColorHover: '#DC2626',
    errorColorPressed: '#B91C1C',
    errorColorSuppl: '#F87171',
    
    fontFamily: "'Circe', sans-serif",
    
    borderRadius: '8px',
    borderRadiusSmall: '4px',
    borderRadiusLarge: '12px',
    
    fontSize: '14px',
    fontSizeMedium: '16px',
    fontSizeLarge: '18px',
    fontSizeHuge: '20px',
    
    textColorBase: '#1E293B',
    textColor1: '#1E293B',
    textColor2: '#64748B',
    textColor3: '#94A3B8',
    
    bodyColor: '#F1F5F9',
    cardColor: '#FFFFFF',
    popoverColor: '#FFFFFF',
    
    borderColor: '#E2E8F0',
    dividerColor: '#E2E8F0',
    
    borderColorModal: '#E2E8F0',
    
    scrollbarColor: '#94A3B8',
    scrollbarColorHover: '#64748B',
  },
  Button: {
    textColor: '#FFFFFF',
    textColorHover: '#FFFFFF',
    textColorPressed: '#FFFFFF',
    textColorFocus: '#FFFFFF',
    colorPrimary: '#2563EB',
    colorHoverPrimary: '#1D4ED8',
    colorPressedPrimary: '#1E40AF',
    colorFocusPrimary: '#1E40AF',
    borderRadius: '8px',
    borderRadiusSmall: '4px',
    height: '40px',
    heightTiny: '32px',
    heightMedium: '38px',
    heightLarge: '44px',
    padding: '0 16px',
    fontWeight: '600',
  },
  Input: {
    color: '#FFFFFF',
    colorFocus: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderColorFocus: '#2563EB',
    borderColorHover: '#CBD5E1',
    borderRadius: '8px',
    height: '40px',
    fontSize: '14px',
  },
  Select: {
    peers: {
      InternalSelection: {
        height: '40px',
        borderRadius: '8px',
        borderColor: '#E2E8F0',
        borderColorFocus: '#2563EB',
        borderColorHover: '#CBD5E1',
      },
      InternalSelectMenu: {
        borderRadius: '8px',
      }
    }
  },
  Table: {
    tdColor: '#FFFFFF',
    thColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    thColorHover: '#F1F5F9',
  },
  Card: {
    borderRadius: '12px',
    color: '#FFFFFF',
    paddingSmall: '16px',
    paddingMedium: '20px',
    paddingLarge: '24px',
  },
  Layout: {
    siderColor: '#FFFFFF',
    headerColor: '#FFFFFF',
  },
  Menu: {
    itemColor: 'transparent',
    itemColorActive: '#DBEAFE',
    itemTextColor: '#1E293B',
    itemTextColorActive: '#2563EB',
    itemTextColorHover: '#64748B',
    itemIconColor: '#64748B',
    itemIconColorActive: '#2563EB',
    itemIconColorHover: '#64748B',
  },
  Tabs: {
    tabTextColor: '#64748B',
    tabTextColorActiveCard: '#2563EB',
    tabTextColorHoverCard: '#2563EB',
    tabPadding: '0 16px',
  },
  Tag: {
    borderRadius: '4px',
  },
  Dropdown: {
    borderRadius: '8px',
  },
  Modal: {
    borderRadius: '12px',
  },
  Drawer: {
    borderRadius: '12px',
  }
}