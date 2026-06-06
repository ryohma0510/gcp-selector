# Graph Report - .  (2026-06-06)

## Corpus Check
- 51 files · ~53,676 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 220 nodes · 256 edges · 22 communities (21 shown, 1 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.89)
- Token cost: 3,800 input · 950 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Custom React Hooks|Custom React Hooks]]
- [[_COMMUNITY_Dev Dependencies & Build Tools|Dev Dependencies & Build Tools]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Chrome Extension Manifest|Chrome Extension Manifest]]
- [[_COMMUNITY_Build & Lint Scripts|Build & Lint Scripts]]
- [[_COMMUNITY_Options Page UI|Options Page UI]]
- [[_COMMUNITY_Core Extension Concepts|Core Extension Concepts]]
- [[_COMMUNITY_Project Selector Component|Project Selector Component]]
- [[_COMMUNITY_Options Page Screenshots|Options Page Screenshots]]
- [[_COMMUNITY_Project Search UI Screenshots|Project Search UI Screenshots]]
- [[_COMMUNITY_E2E Test Suite|E2E Test Suite]]
- [[_COMMUNITY_Service Search UI Screenshots|Service Search UI Screenshots]]
- [[_COMMUNITY_Extension Icons|Extension Icons]]
- [[_COMMUNITY_Demo & Localization|Demo & Localization]]
- [[_COMMUNITY_Main Popup Screenshots|Main Popup Screenshots]]
- [[_COMMUNITY_Popup Header Component|Popup Header Component]]
- [[_COMMUNITY_Webpack Configuration|Webpack Configuration]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 14 edges
3. `GCP Selector README` - 6 edges
4. `icons` - 5 edges
5. `Popup()` - 5 edges
6. `SelectOption` - 5 edges
7. `Chrome Extension Manifest` - 5 edges
8. `GitHub Actions Release Workflow` - 5 edges
9. `App Icon SVG Source` - 5 edges
10. `Cloud Search Icon Visual Design` - 5 edges

## Surprising Connections (you probably didn't know these)
- `GitHub Actions CI Workflow` --references--> `NPM Package Configuration`  [INFERRED]
  .github/workflows/test.yml → package.json
- `CI Version Injection from Git Tag` --rationale_for--> `Chrome Extension Manifest`  [EXTRACTED]
  .github/workflows/release.yml → manifest.json
- `GitHub Actions Release Workflow` --references--> `Chrome Extension Manifest`  [EXTRACTED]
  .github/workflows/release.yml → manifest.json
- `CI Version Injection from Git Tag` --rationale_for--> `NPM Package Configuration`  [EXTRACTED]
  .github/workflows/release.yml → package.json
- `GitHub Actions Release Workflow` --references--> `NPM Package Configuration`  [EXTRACTED]
  .github/workflows/release.yml → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CI/CD Pipeline: Test, Build, Release** — workflows_test, workflows_release, package_package, manifest_manifest [INFERRED 0.90]
- **Chrome Extension Entry Points (Popup and Option)** — manifest_manifest, popup_popup, option_option [EXTRACTED 1.00]
- **Full Release Process Flow** — release_skill, workflows_release, readme_readme, gcp_selector_extension [INFERRED 0.85]

## Communities (22 total, 1 thin omitted)

### Community 0 - "Custom React Hooks"
Cohesion: 0.10
Nodes (19): useNavigation(), useOptions(), useProjects(), container, root, NoProjectsMessageProps, Popup(), ProjectOption (+11 more)

### Community 1 - "Dev Dependencies & Build Tools"
Cohesion: 0.06
Nodes (32): devDependencies, copy-webpack-plugin, css-loader, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react (+24 more)

### Community 2 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (17): author, dependencies, @fortawesome/fontawesome-svg-core, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome, react, react-dom, react-select (+9 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+9 more)

### Community 4 - "Chrome Extension Manifest"
Cohesion: 0.14
Nodes (13): action, default_popup, description, icons, 128, 16, 32, 48 (+5 more)

### Community 5 - "Build & Lint Scripts"
Cohesion: 0.14
Nodes (14): scripts, build, dev, format, format:check, lint, lint:fix, test (+6 more)

### Community 6 - "Options Page UI"
Cohesion: 0.23
Nodes (4): container, root, deleteProject(), listProjects()

### Community 7 - "Core Extension Concepts"
Cohesion: 0.31
Nodes (11): Chrome Storage Permission, Fuzzy Search with Highlight, GCP Selector Chrome Extension, Chrome Extension Manifest, NPM Package Configuration, GCP Selector README, Release Skill (Claude Code), TypeScript Configuration (+3 more)

### Community 8 - "Project Selector Component"
Cohesion: 0.22
Nodes (5): ProjectOption, ProjectSelector, ProjectSelectorProps, mockProjectIds, Item

### Community 9 - "Options Page Screenshots"
Cohesion: 0.36
Nodes (8): Action Column, Add Project Button, Enter Project ID Input Field, Delete Project Button (trash icon), Options Page UI, Project ID Column, Project List Table, Project Manager

### Community 10 - "Project Search UI Screenshots"
Cohesion: 0.32
Nodes (8): Autocomplete Dropdown with Highlighted Match, Chrome Extension Popup Window, Project ID Input Field, Popup Project Selection UI, Search Term Highlight in Suggestion, Select Service Dropdown, Settings Button, GCP Selector Title

### Community 11 - "E2E Test Suite"
Cohesion: 0.43
Nodes (3): EXTENSION_PATH, test, TEST_PROJECTS

### Community 12 - "Service Search UI Screenshots"
Cohesion: 0.43
Nodes (7): Cloud Run Service Option, Cloud Run Jobs Service Option, Project ID Dropdown Field, Matched Text Highlight in Dropdown, Service Search/Filter Field, Popup Service Selection UI, Settings Button

### Community 13 - "Extension Icons"
Cohesion: 0.60
Nodes (6): App Icon 128px PNG, App Icon 16px PNG, App Icon 32px PNG, App Icon 48px PNG, App Icon SVG Source, Cloud Search Icon Visual Design

### Community 14 - "Demo & Localization"
Cohesion: 0.47
Nodes (6): Popup Animated Demo GIF, Chrome Browser Context, Demo Background Page, Chrome Extension Popup UI, Google Homepage (Japanese Locale), Japanese Language Locale

### Community 15 - "Main Popup Screenshots"
Cohesion: 0.40
Nodes (6): Chrome Extension, Main Popup UI, Project ID Dropdown, Service Dropdown, Settings Button, GCP Selector Title

### Community 17 - "Webpack Configuration"
Cohesion: 0.50
Nodes (3): CopyWebpackPlugin, HtmlWebpackPlugin, path

## Knowledge Gaps
- **123 isolated node(s):** `EXTENSION_PATH`, `TEST_PROJECTS`, `manifest_version`, `name`, `version` (+118 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies & Build Tools` to `Runtime Dependencies`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `scripts` connect `Build & Lint Scripts` to `Runtime Dependencies`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Chrome Extension Manifest` connect `Core Extension Concepts` to `Custom React Hooks`, `Options Page UI`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `GCP Selector README` (e.g. with `GitHub Actions Release Workflow` and `GitHub Actions CI Workflow`) actually correct?**
  _`GCP Selector README` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `EXTENSION_PATH`, `TEST_PROJECTS`, `manifest_version` to the rest of the system?**
  _123 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Custom React Hooks` be split into smaller, more focused modules?**
  _Cohesion score 0.1028225806451613 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies & Build Tools` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._