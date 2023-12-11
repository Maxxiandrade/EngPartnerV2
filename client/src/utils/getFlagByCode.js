export const getFlagByCode = (code) => {
    if(code === 'es'){
      return '🇪🇸'
    }
    if(code === 'en'){
      return '🇬🇧'
    }
    if(code === 'fr'){
      return '🇫🇷'
    }
    if(code === 'it'){
      return '🇮🇹'
    }
    if(code === 'de'){
      return '🇩🇪'
    }
    if(code === 'ru'){
      return '🇷🇺'
    }
    if(code === 'zh' || code === 'zh-TW'){
      return '🇨🇳'
    }
    if(code === 'nl'){
      return '🇳🇱'
    }
    if(code === 'ko'){
      return '🇰🇷'
    }
    if(code === 'gn'){
      return '🇵🇾'
    }
    if(code === 'id'){
      return '🇮🇩'
    }
    if(code === 'pt'){
      return '🇵🇹'
    }
  }