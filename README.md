# my-type-challenges

TypeChallenges の各問題に対する自分用ソリューションをまとめたリポジトリです。
開発環境やチャレンジの進め方は [USAGE.md](./USAGE.md) に記載しています。

## TypeChallenges 問題ページ → Markdown リンク生成ブックマークレット

GitHub 上の TypeChallenges 問題ページ（`https://github.com/type-challenges/type-challenges/blob/main/questions/.../README.md`）で実行すると、
`[#4 Pick](https://github.com/...)` のような Markdown リンクをクリップボードにコピーできます。

1. ブラウザで新しいブックマークを作成し、URL 欄に以下を貼り付けます。
2. TypeChallenges の任意の問題ページを開き、ブックマークをクリックします。
3. クリップボードにコピーされた Markdown をメモ等へ貼り付けます。

```javascript
javascript:(async()=>{const slug=(location.pathname.match(/questions\/([^/]+)/)||[])[1];if(!slug){alert('TypeChallengesの問題ページではありません');return;}const [numRaw,...rest]=slug.split('-');const num=parseInt(numRaw,10);const titleNode=document.querySelector('.markdown-body h1');const plainTitle=titleNode?.childNodes?.[0]?.textContent?.trim();const slugTitle=rest.slice(1).map(w=>w.replace(/\b\w/g,c=>c.toUpperCase())).join(' ');const title=plainTitle||slugTitle||slug;const url=location.href.replace(/[#?].*/,'');const md=`[#${num} ${title}](${url})`;try{await navigator.clipboard.writeText(md);alert(`コピーしました: ${md}`);}catch(err){prompt('以下をコピーしてください',md);}})();
```

> **補足**
> - クリップボード API が利用できない環境では、フォールバックのダイアログで手動コピーできます。
> - TypeChallenges 以外のページで実行すると警告を出して処理を中断します。
