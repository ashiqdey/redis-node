# Nodejs with typescript
This template conatins nodejs with typescript, typeorm, eslint, prettier, and unit test with jest.

## Install typescript globally

```
npm i -g typescript
```

## Generate tsconfig file

```
tsc --init
```

## Make change to tsconfig

```
"target": "es6"
"rootDir": "./src"
"outDir": "./dist"
"moduleResolution": "node"
```

## Add package.json file

```
npm init
```

## Install packages

```
npm i express
npm i -D typescript ts-node nodemon @types/node @types/express
```

## Make changes to package.json

```
"scripts": {
  "start": "node dist/app.js",
  "dev": "nodemon src/app.ts",
  "build": "tsc -p ."
},
```

# 2. ORM

## 2.1 install packages

```
npm install typeorm
npm install reflect-metadata
```

## 2.2 add reflect-metadata global place of your app eg. app.js

```
import "reflect-metadata"
```

## 2.3 add to tsconfig

```
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
"strictPropertyInitialization": false
```

## 2.4 init typeorm config

```
npx typeorm init
```


# 3. eslint and prettier

## 3.1 install packages

```
"@typescript-eslint/eslint-plugin": "^6.4.1",
"@typescript-eslint/parser": "^6.4.1",
"eslint": "^8.47.0",
"prettier": "^3.0.2",
```


## 3.2 Add the following in package.json

```
"test": "jest",
"lint": "eslint .",
"lint-fix": "eslint . --fix",
"format": "prettier --write .",
"lint-and-format": "npm run lint && npm run format"
```

## 3.3 Add the following in .eslintrc.js

```
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/quotes': ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { args: 'all', argsIgnorePattern: '^_' },
    ],
  },
  ignorePatterns: ['dist/', 'backups/'],
};
```


## 3.4 Add the following in .prettierrc.js

```
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  ignorePatterns: ['dist/', 'backups/'],
};
```

# 4. Unit testing using jest

## 4.1 install packages

```
npm i @types/jest jest ts-jest -D
```

## 4.2 add the following in package.json

```
"test": "jest",
```
