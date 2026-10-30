# Կիբերփանք Երևան 2150

Ճյուղավորվող սյուժեով տեքստային խաղ՝ վեբ տարբերակ (vanilla JS, առանց կախվածությունների)։

## Գործարկում տեղում
Բրաուզերը `fetch`-ով կարդում է JSON ֆայլերը, ուստի պետք է պարզ սերվեր (ֆայլը ուղիղ բացելը չի աշխատի).

    python3 -m http.server 8000

Բացել http://localhost:8000

## GitHub Pages
Repo Settings → Pages → Branch: `main` / root։

## Կառուցվածք
- `story/` – գլուխները JSON ձևաչափով (մեկ գլուխ = մեկ ֆայլ)
- `story/endings/endings.json` – ավարտները
- `js/engine.js` – սյուժեի շարժիչ (վիճակ, ընտրություններ)
- `js/hacking.js` – հաքերության մինի-խաղ
- `docs/` – աշխարհի բիբլիա

## Նոր գլուխ ավելացնել
1. Ստեղծել `story/ch03_xxx.json`
2. Ավելացնել անունը `js/engine.js`-ի `CHAPTERS` ցանկում
3. Անցումը գրել `"next": "ch03_xxx:start"`

## Աշխատանքի կանոններ
- `main` – միշտ աշխատող տարբերակ
- ճյուղեր՝ `chapter/03-xxx`, `feature/xxx`
- միավորում՝ միայն pull request-ով
- սցենարիստներ՝ `story/`, ծրագրավորողներ՝ `js/`, `index.html`, `style.css`
