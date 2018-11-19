export default (req, res) => {
  const categories = [
    {
      features: [
        {
          id: 'accessibility-jsx-a11y',
          implemented: true,
          name: 'Accessibility with jsx-a11y'
        }
      ],
      id: 'accessibility',
      name: 'Accessibility'
    },
    {
      features: [
        {
          id: 'analytics-google',
          implemented: true,
          name: 'Google Analytics and Google Tag Manager'
        }
      ],
      id: 'analytics',
      name: 'Analytics'
    },
    {
      features: [
        {
          id: 'code-es6-babel',
          implemented: true,
          name: 'Modern Javascript with ESNext and Babel transpiling'
        },
        {
          id: 'code-react',
          implemented: true,
          name: 'Optimized rendering with React'
        },
        {
          id: 'code-redux',
          implemented: true,
          name: 'Functional state management with Redux'
        },
        {
          id: 'code-immutable',
          implemented: true,
          name: 'Disciplined development with Immutable data structures'
        },
        {
          id: 'code-splitting',
          implemented: true,
          name: 'Component-based code splitting with React-Loadable'
        },
        {
          id: 'code-linting',
          implemented: true,
          name: 'Code quality assurance with ESLint/TSLint'
        },
        {
          id: 'code-formatting',
          implemented: true,
          name: 'Code formatting assurance with Prettier'
        },
        {
          id: 'code-prop-types',
          implemented: true,
          name: 'Type checking with PropTypes'
        },
        {
          id: 'code-typescript',
          implemented: false,
          name: 'Type checking with TypeScript'
        }
      ],
      id: 'code',
      name: 'Code'
    },
    {
      features: [
        {
          id: 'database-mongoose',
          implemented: true,
          name: 'Plug and Play MongoDB integration'
        },
        {
          id: 'database-mysql',
          implemented: false,
          name: 'Plug and Play MySQL integration'
        }
      ],
      id: 'database',
      name: 'Database'
    },
    {
      features: [
        {
          id: 'development-bash-scripts',
          implemented: true,
          name: 'Complex development scripting with Bash scripts'
        },
        {
          id: 'development-testing',
          implemented: true,
          name: 'Testing with Jest and Enzyme'
        },
        {
          id: 'development-dynamic-routing',
          implemented: true,
          name: 'Dynamic route configuration'
        },
        {
          id: 'development-type-checking',
          implemented: true,
          name: 'Type checking with propTypes and defaultProps'
        }
      ],
      id: 'development',
      name: 'Development'
    },
    {
      features: [
        {
          id: 'documentation-jsdoc',
          implemented: true,
          name: 'JSDoc code commenting'
        },
        {
          id: 'documentation-styleguide-api',
          implemented: true,
          name: 'Styleguide component Api Documentation'
        },
        {
          id: 'documentation-storybook-demos',
          implemented: true,
          name: 'Storybook component demos'
        }
      ],
      id: 'documentation',
      name: 'Documentation'
    },
    {
      features: [
        {
          id: 'isomorphic-rendering',
          implemented: true,
          name:
            'Plug and play isomorphic (Server-side and client-side) rendering'
        },
        {
          id: 'isomorphic-hydration',
          implemented: true,
          name: 'Isomorphic store hydration with React-Frontload'
        },
        {
          id: 'isomorphic-typescript',
          implemented: false,
          name: 'Isomorphic Typescript'
        }
      ],
      id: 'isomorphic',
      name: 'Isomorphic'
    },
    {
      features: [
        {
          id: 'security-auth',
          implemented: true,
          name: 'User authorization and password recovery included'
        },
        {
          id: 'security-cors',
          implemented: true,
          name: 'Configurable cross-origin resource sharing (CORS) rules'
        },
        {
          id: 'security-bcrypt',
          implemented: true,
          name: 'Encryption using bcrypt'
        }
      ],
      id: 'security',
      name: 'Security'
    },
    {
      features: [
        {
          id: 'foo-seo',
          implemented: true,
          name: 'Search engine optimization with React Helmet'
        }
      ],
      id: 'seo',
      name: 'Search Engine Optimization'
    },
    {
      features: [
        {
          id: 'social-network-integration',
          implemented: true,
          name: 'Facebook and Twitter integration out of the box'
        }
      ],
      id: 'social-network-integration',
      name: 'Social Network Integration'
    },
    {
      features: [
        {
          id: 'styling-color-configs',
          implemented: true,
          name: 'Styling with color configs'
        },
        {
          id: 'styling-css-in-js',
          implemented: true,
          name: 'Styling with CSS-in-JS'
        }
      ],
      id: 'styling',
      name: 'Styling'
    },
    {
      features: [
        {
          id: 'ui-language-localization',
          implemented: true,
          name: 'Isomorphic language localization'
        },
        {
          id: 'ui-modal',
          implemented: true,
          name: 'Dynamic modal window'
        },
        {
          id: 'ui-bootstrap',
          implemented: true,
          name: 'Twitter Bootstrap integration'
        },
        {
          id: 'ui-material-ui',
          implemented: true,
          name: 'Google Material UI integration'
        },
        {
          id: 'ui-forms',
          implemented: true,
          name: 'Complex form abstraction and validation with React-Informed'
        },
        {
          id: 'ui-loading',
          implemented: true,
          name: 'Interstitial loading animations'
        }
      ],
      id: 'ui',
      name: 'User Interface'
    },
    {
      features: [
        {
          id: 'ux-persistence',
          implemented: true,
          name: 'State persistence with React Persist'
        }
      ],
      id: 'ux',
      name: 'User Experience'
    },
    {
      features: [
        {
          id: 'mom',
          implemented: false,
          name:
            'Will finally allow me to build a website for my mom with as little effort as she expects it would take'
        }
      ],
      id: 'mom',
      name: 'Additional benefits'
    }
  ];
  res.status(200).send({ categories });
};
