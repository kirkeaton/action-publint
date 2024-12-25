# action-publint

GitHub Action that lints a package.json file for packaging errors using [Publint](https://publint.dev/).

## Usage

See [action.yml](action.yml)

```yaml
- uses: kirkeaton/action-publint@v1
  with:
    # The level of messages to log.
    # - suggestion: logs all messages
    # - warning: logs only warning and error messages
    # - error: logs only error messages
    # Default: 'suggestion'
    level: ''

    # Path to your package that contains a package.json file.
    # Default: '.'
    pkg-dir: ''

    # Report warnings as errors.
    # Default: false
    strict: ''
```

**Basic:**

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
  - run: npm ci
  - run: npm run build
  - uses: kirkeaton/action-publint@v1
```
