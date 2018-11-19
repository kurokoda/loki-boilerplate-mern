const WHITE = '#FFF';
const BLACK = '#000';
const VERY_DARK_GRAY = '#333333';
const DARK_GRAY = '#666666';
const GRAY = '#999999';

const PRIMARY = '#E8940C';

const APPLICATION_BACKGROUND = VERY_DARK_GRAY;
const APPLICATION_BORDER = VERY_DARK_GRAY;
const APPLICATION_TEXT = GRAY;
const HEADER_TEXT = PRIMARY;
const FEATURE_BACKGROUND_ACTIVE = DARK_GRAY
const FEATURE_BACKGROUND_INACTIVE = VERY_DARK_GRAY


export default {
  about: {
    color: {
      text: APPLICATION_TEXT,
      headerText: HEADER_TEXT,
      titleText: HEADER_TEXT
    }
  },
  app: {
    color: {
      background: APPLICATION_BACKGROUND
    }
  },
  footer: {
    color: {
      text: APPLICATION_TEXT,
      background: APPLICATION_BACKGROUND
    }
  },
  feature: {
    color: {
      text: BLACK,
      headerText: HEADER_TEXT,
      activeBackground: FEATURE_BACKGROUND_ACTIVE,
      inactiveBackground: FEATURE_BACKGROUND_INACTIVE
    }
  },
  header: {
    color: {
      pageLink: APPLICATION_TEXT,
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
  well: {
    color: {
      backgroundImage: 'linear-gradient(#333333, #444444)',
      border: APPLICATION_BORDER
    }
  },
};
