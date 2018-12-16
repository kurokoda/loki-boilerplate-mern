const WHITE = '#FFF';
const BLACK = '#000';
const VERY_DARK_GRAY = '#333333';
const DARK_GRAY = '#666666';
const GRAY = '#999999';

const PRIMARY = '#df6100';
const BRIGHT_PRIMARY = '#ff8800';
const VERY_BRIGHT_PRIMARY = '#ffb800';

const SECONDARY = '#0074df';
const BRIGHT_SECONDARY = '#0088ff';
const VERY_BRIGHT_SECONDARY = '#00a3ff';

const APPLICATION_BACKGROUND = VERY_DARK_GRAY;
const APPLICATION_BORDER = VERY_DARK_GRAY;
const APPLICATION_LOGO = PRIMARY;
const APPLICATION_TEXT = GRAY;
const HEADER_TEXT = PRIMARY;
const FEATURE_BACKGROUND_ACTIVE = DARK_GRAY;
const FEATURE_BACKGROUND_INACTIVE = VERY_DARK_GRAY;

export default {
  about: {
    color: {}
  },
  app: {
    color: {
      logo: APPLICATION_LOGO,
      background: APPLICATION_BACKGROUND,
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
      backgroundImage: 'linear-gradient(#333333, #444444)',
      border: APPLICATION_BORDER
    }
  }
};
