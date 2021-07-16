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
| `source-repo` | (Required) The repository from which the configuration will be copied. Format: `owner/name` ||
| `source-path` | Path to the configuration file in the remote repository | `.tflint.hcl` |
| `source-ref` | Ref or branch of the remote repository to target | |
| `destination-path` | Path where configuration file will be written locally | `$HOME/.tflint.hcl` |
| `token` | Github personal access token, [required](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#granting-additional-permissions) for reading from private repositories.  ||

### Action outputs

The following outputs can be used by subsequent workflow steps.

| Name | Description |
| --- | --- |
| `path` | Path to the configuration file |

## Releasing

```sh
npm version (major|minor|patch) && git push --follow-tags
```
