export interface HeroStyleConfig {
  name: string;
  theme: {
    background: string;
    primaryGradient: string;
    accentGradient: string;
    textColor: string;
    cardBg: string;
    buttonGradient: string;
    buttonTextColor: string;
    emergencyColor: string;
  };
  typography: {
    titleSize: string;
    subtitleSize: string;
    accentText: string;
  };
  animations: {
    titleAnimation: string;
    letterAnimation: string;
    countAnimation: string;
  };
}

export const HERO_STYLES: Record<string, HeroStyleConfig> = {
  emergency: {
    name: 'Emergency Red',
    theme: {
      background: 'bg-gradient-to-br from-red-900 via-red-700 to-orange-600',
      primaryGradient: 'from-red-900 via-red-700 to-orange-600',
      accentGradient: 'from-yellow-400 to-orange-400',
      textColor: 'text-white',
      cardBg: 'bg-white/10 backdrop-blur-md',
      buttonGradient: 'from-yellow-400 to-orange-500',
      buttonTextColor: 'text-black',
      emergencyColor: 'bg-red-600'
    },
    typography: {
      titleSize: 'text-4xl md:text-6xl lg:text-7xl',
      subtitleSize: 'text-red-200',
      accentText: 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'
    },
    animations: {
      titleAnimation: 'animate-fade-in-up',
      letterAnimation: 'animate-bounce',
      countAnimation: 'animate-count-up'
    }
  },
  ocean: {
    name: 'Ocean Blue',
    theme: {
      background: 'bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600',
      primaryGradient: 'from-blue-900 via-blue-700 to-cyan-600',
      accentGradient: 'from-cyan-400 to-blue-400',
      textColor: 'text-white',
      cardBg: 'bg-white/10 backdrop-blur-md',
      buttonGradient: 'from-cyan-400 to-blue-500',
      buttonTextColor: 'text-white',
      emergencyColor: 'bg-blue-600'
    },
    typography: {
      titleSize: 'text-4xl md:text-6xl lg:text-7xl',
      subtitleSize: 'text-blue-200',
      accentText: 'bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'
    },
    animations: {
      titleAnimation: 'animate-fade-in-up',
      letterAnimation: 'animate-pulse',
      countAnimation: 'animate-count-up'
    }
  },
  forest: {
    name: 'Forest Green',
    theme: {
      background: 'bg-gradient-to-br from-green-900 via-green-700 to-emerald-600',
      primaryGradient: 'from-green-900 via-green-700 to-emerald-600',
      accentGradient: 'from-emerald-400 to-green-400',
      textColor: 'text-white',
      cardBg: 'bg-white/10 backdrop-blur-md',
      buttonGradient: 'from-emerald-400 to-green-500',
      buttonTextColor: 'text-white',
      emergencyColor: 'bg-green-600'
    },
    typography: {
      titleSize: 'text-4xl md:text-6xl lg:text-7xl',
      subtitleSize: 'text-green-200',
      accentText: 'bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent'
    },
    animations: {
      titleAnimation: 'animate-fade-in-up',
      letterAnimation: 'animate-bounce',
      countAnimation: 'animate-count-up'
    }
  },
  sunset: {
    name: 'Sunset Purple',
    theme: {
      background: 'bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600',
      primaryGradient: 'from-purple-900 via-purple-700 to-pink-600',
      accentGradient: 'from-pink-400 to-purple-400',
      textColor: 'text-white',
      cardBg: 'bg-white/10 backdrop-blur-md',
      buttonGradient: 'from-pink-400 to-purple-500',
      buttonTextColor: 'text-white',
      emergencyColor: 'bg-purple-600'
    },
    typography: {
      titleSize: 'text-4xl md:text-6xl lg:text-7xl',
      subtitleSize: 'text-purple-200',
      accentText: 'bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'
    },
    animations: {
      titleAnimation: 'animate-fade-in-up',
      letterAnimation: 'animate-pulse',
      countAnimation: 'animate-count-up'
    }
  },
  minimal: {
    name: 'Minimal Gray',
    theme: {
      background: 'bg-gradient-to-br from-gray-900/80 via-gray-700/80 to-slate-600/80',
      primaryGradient: 'from-gray-900 via-gray-700 to-slate-600',
      accentGradient: 'from-slate-400 to-gray-400',
      textColor: 'text-white',
      cardBg: 'bg-white/5 backdrop-blur-md',
      buttonGradient: 'from-slate-400 to-gray-500',
      buttonTextColor: 'text-white',
      emergencyColor: 'bg-gray-600'
    },
    typography: {
      titleSize: 'text-3xl md:text-5xl lg:text-6xl',
      subtitleSize: 'text-gray-300',
      accentText: 'bg-gradient-to-r from-slate-400 to-gray-400 bg-clip-text text-transparent'
    },
    animations: {
      titleAnimation: 'animate-fade-in',
      letterAnimation: 'animate-fade-in',
      countAnimation: 'animate-fade-in'
    }
  }
};

export const DEFAULT_HERO_STYLE = 'emergency';