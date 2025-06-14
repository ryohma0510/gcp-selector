# gcp-selector

A Chrome extension that allows you to quickly select Google Cloud Platform (GCP) projects and services at once.

<img width="300px" height="auto" src="image/popup.gif">

The list supports fuzzy search, with matching characters highlighted in red for easy identification.


<img width="300px" height="auto" src="image/popup-service.png">

## プロジェクト構成

### アーキテクチャ
このプロジェクトはChrome拡張機能として設計されており、React + TypeScriptで構築されています。

### ディレクトリ構造
```
├── manifest.json          # Chrome拡張機能マニフェスト
├── package.json           # プロジェクト依存関係
├── tsconfig.json          # TypeScript設定
├── webpack.config.js      # Webpack設定
├── jest.config.js         # テスト設定
│
├── src/                   # ソースコード
│   ├── popup/             # ポップアップ画面
│   │   ├── Popup.tsx      # メインポップアップコンポーネント
│   │   ├── popup.html     # ポップアップHTML
│   │   └── index.tsx      # ポップアップエントリーポイント
│   │
│   ├── option/            # 設定画面
│   │   ├── Option.tsx     # 設定コンポーネント
│   │   ├── option.html    # 設定HTML
│   │   └── index.tsx      # 設定エントリーポイント
│   │
│   ├── components/        # 再利用可能コンポーネント
│   │   ├── popup/         # ポップアップ専用コンポーネント
│   │   │   ├── PopupHeader.tsx        # ヘッダーコンポーネント
│   │   │   ├── ProjectSelector.tsx    # プロジェクト選択コンポーネント
│   │   │   ├── ServiceSelector.tsx    # サービス選択コンポーネント
│   │   │   └── NoProjectsMessage.tsx  # プロジェクト未登録メッセージ
│   │   └── select/        # セレクト関連コンポーネント
│   │       └── Option.tsx # カスタムオプションコンポーネント
│   │
│   ├── hooks/             # カスタムフック
│   │   ├── useNavigation.ts  # ナビゲーション管理
│   │   ├── useOptions.ts     # 設定管理
│   │   └── useProjects.ts    # プロジェクト管理
│   │
│   ├── utils/             # ユーティリティ関数
│   │   ├── projects/      # プロジェクト関連
│   │   │   ├── AddProject.ts     # プロジェクト追加
│   │   │   ├── DeleteProject.ts  # プロジェクト削除
│   │   │   ├── ListProject.ts    # プロジェクト一覧取得
│   │   │   └── Constant.ts       # 定数定義
│   │   └── services/      # サービス関連
│   │       └── ListServices.ts   # サービス一覧取得
│   │
│   └── types/             # 型定義
│       ├── SelectOption.ts    # セレクトオプション型
│       └── Service.ts         # サービス型
│
├── public/                # パブリックアセット
├── dist/                  # ビルド出力
├── icons/                 # アイコンファイル
└── image/                 # ドキュメント用画像
```

### 技術スタック
- **フレームワーク**: React 19.0.0
- **言語**: TypeScript
- **UI**: react-select, FontAwesome
- **ビルドツール**: Webpack
- **テスト**: Jest, React Testing Library
- **パッケージマネージャ**: npm

### 主要機能
- GCPプロジェクトとサービスの同時選択
- ファジー検索対応
- Chrome拡張機能としてのシームレスな統合
- ローカルストレージでのプロジェクト管理

## Features
- Select both project and service simultaneously
- Register your GCP project IDs

## Installation

Install easily from the [Chrome Web Store](https://chrome.google.com/webstore/detail/gcp-selector/gdfiojnnhlfmkbghihllimpaanldflag)

## Settings

<img width="300px" height="auto" src="image/option.png">

## Requirements
- Google Chrome browser
- Account with access to GCP console
