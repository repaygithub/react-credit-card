# `@repay/react-credit-card`

[![Coverage 100%](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)](./Coverage.md)
[![CircleCI](https://circleci.com/gh/repaygithub/react-credit-card/tree/master.svg?style=svg)](https://circleci.com/gh/repaygithub/react-credit-card/tree/master)

A port of Card by [@jessepollak](https://github.com/jessepollak/card) and re-write of `react-credit-card` by [@JohnyDays](https://github.com/JohnyDays/react-credit-card). We chose not to fork because it's a full re-write in TypeScript but the API is almost identical to `react-credit-card`

[View the demo](https://repaygithub.github.io/react-credit-card/)

## Installation and Usage

#### Install via `npm` or `yarn` using the command-line

```bash
npm install @repay/react-credit-card
// OR
yarn add @repay/react-credit-card
```

#### Importing the CSS

You can import the CSS directly into some bundled CSS using the import directive.

```css
@import "@repay/react-credit-card/dist/react-credit-card.css";
```

If using Webpack or some other bundler along with a css toolchain, you can import this into your JavaScript code.

```js
import "@repay/react-credit-card/dist/react-credit-card.css";
```

If using css-modules, you will need to override this to import the styles as global:
example for webpack to override css-modules.

```js
import "!style-loader!css-loader?sourceMap!@repay/react-credit-card/dist/react-credit-card.css";
```

#### Using the Card

```tsx
// see stories/Examples.stories.tsx
import Card from "@repay/react-credit-card";

export default function CreditCardForm() {
  const [values, setValues] = React.useState({
    name: "",
    number: "",
    expiration: "",
    cvc: ""
  });
  const handleChange = React.useCallback(
    event => {
      const { name, value } = event.target;
      setValues(v => ({ ...v, [name]: value }));
    },
    [setValues]
  );

  const [focused, setFocus] = React.useState<FOCUS_TYPE | undefined>(undefined);
  const handleFocus = React.useCallback(
    event => setFocus(event.target.name as FOCUS_TYPE),
    [setFocus]
  );
  const handleBlur = React.useCallback(() => setFocus(undefined), [setFocus]);

  return (
    <form>
      <div style={styles}>
        <fieldset>
          <label>Name on card</label>
          <input
            name="name"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.name}
          />
        </fieldset>
        <fieldset>
          <label>Card Number</label>
          <input
            name="number"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.number}
          />
        </fieldset>
        <fieldset>
          <label>Expiration</label>
          <input
            name="expiration"
            placeholder="MM/YY"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.expiration}
          />
        </fieldset>
        <fieldset style={{ marginBottom: "20px" }}>
          <label>CVC</label>
          <input
            name="cvc"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.cvc}
          />
        </fieldset>
        <ReactCreditCard {...values} focused={focused} />
      </div>
    </form>
  );
}
```

## Dev Environment Setup

1. Clone this repository into your local filesystem.
2. Run the command `yarn install` to install the necessary dev dependencies.
3. Run the command `yarn dev` to spin up the storybook dev environment. This allows you to easily see the credit card component, and use it as you modify.

## General Commands

- `yarn tdd`: Runs the test suite in watch mode, which will trigger tests to re-run when changes are made.
- `yarn test`: runs the full test suite, TypeScript checks, and validates formatting; then documents current coverage
- `yarn fmt`: tries to automatically fixes formatting or errors to fix others
- `yarn build`: builds the distributable package into the `dist/` folder

### Publishing

```
yarn test:ci
yarn build
yarn publish
```
