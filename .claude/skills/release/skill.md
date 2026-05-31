---
name: release
description: Release a new version of gcp-selector. Run this skill when the user says "リリースして", "release", or asks to publish. Version is injected automatically by CI from the tag name — no version bump commit needed. Guides through gh release create → CI attaches zip → Chrome Web Store upload reminder.
---

# gcp-selector Release

The version is automatically injected by CI from the tag name. **No version bump commit is needed in PRs.**

## Prerequisites

- All changes to release are merged into `main`
- `gh` CLI is authenticated (`gh auth status`)

## Steps

### Step 1: Determine the version

Check the previous release and confirm the next version with the user.

```bash
gh release list --limit 5
```

Versioning guide:
- Bug fixes only → patch (e.g. `1.0.0` → `1.0.1`)
- New features → minor (e.g. `1.0.0` → `1.1.0`)
- Breaking changes → major (e.g. `1.0.0` → `2.0.0`)

### Step 2: Create a GitHub Release

Use `--generate-notes` to auto-generate release notes from PRs merged since the last release.

```bash
gh release create vX.X.X \
  --title "vX.X.X" \
  --generate-notes \
  --target main
```

This will:
1. Create tag `vX.X.X` on the latest commit of `main`
2. Publish the GitHub Release
3. Trigger the CI **Release** workflow automatically

### Step 3: Wait for CI to complete

```bash
gh run list --workflow=release.yml --limit 3
```

Once CI finishes, `gcp-selector.zip` with the injected version will be attached to the release.

### Step 4: Upload to Chrome Web Store (manual)

```bash
# Open the release page in browser
gh release view vX.X.X --web
```

1. Download `gcp-selector.zip` from the release page
2. Open [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Select **GCP Selector** → **Package** → **Upload new package**
4. Submit for review

## Edit release notes

```bash
gh release edit vX.X.X --notes "Custom release notes"
# or in browser
gh release view vX.X.X --web
```

## Troubleshooting

### If CI fails

```bash
gh run list --workflow=release.yml --limit 3
gh run view <run-id> --log-failed
```

### Delete a release (including its tag)

```bash
gh release delete vX.X.X --yes --cleanup-tag
```
