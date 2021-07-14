# tflint Load Config Action

Copy a tflint configuration file from a remote repository to use locally with `tflint`.

## Usage

```yaml
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: terraform-linters/tflint-load-config-action@v1
        with:
          source-repo: ryanwholey/public-tflint-config
      - uses: terraform-linters/setup-tflint@v1
        name: Setup TFLint
        with:
          tflint_version: v0.29.0
      - run: tflint --format compact
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `source-repo` | (Required) The repository to copy a tflint configuration from. Format: `owner/name` ||
| `source-path` | Path to the configuration in teh remote repo | `.` |
| `source-ref` | Ref or branch of the remote repository to target | `main` |
| `destination-path` | File path to write the config file | `${{ runner.temp }}` |
| `token` | Github token, required for access to private repos ||

### Action outputs

The following outputs can be used by subsequent workflow steps.

| Name | Description |
| --- | --- |
| `path` | Path to the configuration file |

## Releasing

```sh
npm version (major|minor|patch) && git push --follow-tags
```
