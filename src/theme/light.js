const WHITE = '#FFF';
const BLACK = '#000';
const VERY_DARK_GRAY = '#333333';
const DARK_GRAY = '#666666';
const GRAY = '#999999';
const LIGHT_GRAY = '#CCCCCC';

const PRIMARY = '#229ebf';

const APPLICATION_BACKGROUND = WHITE;
const APPLICATION_BORDER = WHITE;
const APPLICATION_LOGO = PRIMARY;
const APPLICATION_TEXT = GRAY;
const HEADER_TEXT = PRIMARY;
const FEATURE_BACKGROUND_ACTIVE = PRIMARY;
const FEATURE_BACKGROUND_INACTIVE = LIGHT_GRAY;

export default {
  about: {
    color: {}
  },
  app: {
    color: {
      background: APPLICATION_BACKGROUND,
      logo: APPLICATION_LOGO,
      text: APPLICATION_TEXT,
      headerText: HEADER_TEXT
    },
    fontSize: {
      primary: '18px'
    }
  },
  footer: {
    color: {
      background: BLACK
    }
  },
  feature: {
    color: {
      text: BLACK,
      activeBackground: FEATURE_BACKGROUND_ACTIVE,
      inactiveBackground: FEATURE_BACKGROUND_INACTIVE
    }
  },
  header: {
    color: {
      pageLink: APPLICATION_TEXT,
      pageLinkActive: PRIMARY,
      pageLinkHover: '#00FF00',
      actionLink: APPLICATION_TEXT,
      background: APPLICATION_BACKGROUND
    }
  },
  logo: {
    color: {
      background: APPLICATION_BACKGROUND,
      foreground: PRIMARY
    }
  },
  modal: {
    color: {
      background: APPLICATION_BACKGROUND,
      overlay: 'rgba(0, 0, 0, 0.5)',
      text: APPLICATION_TEXT
    }
  },
  welcome: {
    color: {}
  },
  well: {
    color: {
      backgroundImage: 'linear-gradient(#FFFFFF, #EEEEEEW)',
      border: APPLICATION_BORDER
    }
  }
};
