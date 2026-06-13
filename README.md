# 育誠不動産株式会社 コーポレートサイト

## 概要
育誠不動産株式会社（東京都豊島区池袋）のコーポレートウェブサイト。
静的HTML/CSS/JSで構成。外部ライブラリ不使用。

## ページ構成
| ページ | ファイル |
|--------|---------|
| トップ | index.html |
| ご挨拶 | greeting.html |
| 会社概要 | company.html |
| 事業内容一覧 | service/index.html |
| 分譲マンション・戸建 | service/mansion.html |
| 賃貸管理・仲介 | service/rental.html |
| リフォーム・設備 | service/reform.html |
| コンサルティング・保険 | service/consul.html |
| 物件情報 | properties.html |
| 採用情報 | recruit.html |
| お知らせ | news.html |
| お問い合わせ | contact.html |
| プライバシーポリシー | policy.html |

## デプロイ（GitHub Actions）

### 初回設定
1. GitHubにリポジトリを作成
2. `git remote add origin https://github.com/YOUR_ORG/ikusei-web.git`
3. GitHubリポジトリの Settings > Secrets and variables > Actions に以下を登録:
   - `DEPLOY_HOST`: `153.122.4.97`
   - `DEPLOY_USER`: `root`
   - `DEPLOY_SSH_KEY`: SSHプライベートキー（~/.ssh/github_actions_deploy の内容）
4. `git push -u origin main` で自動デプロイ開始

### デプロイ先
`/var/www/vhosts/witts-sol.com/httpdocs/ikusei/`
→ https://witts-sol.com/ikusei/

### サーバー側 nginx 設定追加（初回のみ）
`/var/www/vhosts/system/witts-sol.com/conf/vhost_nginx.conf` に追記:
```nginx
location /ikusei/ {
    root /var/www/vhosts/witts-sol.com/httpdocs;
    try_files $uri $uri/ $uri.html =404;
}
```
追記後: `systemctl reload nginx`

## プレースホルダー一覧
- `greeting.html`: 代表者写真（`<!-- [PLACEHOLDER: 代表者写真] -->`）
- `company.html`: 池袋駅からの徒歩分数
- `properties.html`: 実物件情報（`<!-- [PLACEHOLDER: 実物件情報] -->`）
- `news.html`: 新しいお知らせ追加
- `contact.html`: フォーム送信先エンドポイント
