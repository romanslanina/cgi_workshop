# 1. 🚀 GitHub Flow a CI/CD Workshop

Tento workshop vás provede základními principy práce s "GitHub Flow" a CI/CD pipeline. Naučíte se, jak nastavit vývojové větve, automatizovat testování a nasazování aplikace do různých prostředí.

## 1.1. 📋 Obsah

- [1. 🚀 GitHub Flow a CI/CD Workshop](#1--github-flow-a-cicd-workshop)
  - [1.1. 📋 Obsah](#11--obsah)
  - [1.2. ⚙️ Prerekvizity a nastavení v průběhu řešení úkolů](#12-️-prerekvizity-a-nastavení-v-průběhu-řešení-úkolů)
    - [1.2.1. Příprava vlastního repozitáře](#121-příprava-vlastního-repozitáře)
    - [1.2.2. Nastavení GitHub Pages](#122-nastavení-github-pages)
    - [1.2.3. Nastavení branch protection rules na GitHubu pro větve `dev`, `test`, `uat` a `main`](#123-nastavení-branch-protection-rules-na-githubu-pro-větve-dev-test-uat-a-main)
  - [1.3. 🔧 Úkol 1: Vytvoření větví pro různá prostředí](#13--úkol-1-vytvoření-větví-pro-různá-prostředí)
    - [1.3.1. Cíl](#131-cíl)
    - [1.3.2. Nápověda](#132-nápověda)
  - [1.4. 🔧 Úkol 2: Nasazení aplikace do všech prostředí](#14--úkol-2-nasazení-aplikace-do-všech-prostředí)
    - [1.4.1. Cíl](#141-cíl)
    - [1.4.2. Nápověda](#142-nápověda)
  - [1.5. 🔧 Úkol 3a: Implementace testů do CI pipeline](#15--úkol-3a-implementace-testů-do-ci-pipeline)
    - [1.5.1. Cíl](#151-cíl)
    - [1.5.2. Nápověda](#152-nápověda)
  - [1.6. 🔧 Úkol 3b: Vývojový cyklus s rozšířeným GitHub Flow](#16--úkol-3b-vývojový-cyklus-s-rozšířeným-github-flow)
    - [1.6.1. Cíl](#161-cíl)
    - [1.6.2. Nápověda](#162-nápověda)
  - [1.7. 🔧 Úkol 5: Hotfix workflow](#17--úkol-5-hotfix-workflow)
    - [1.7.1. Cíl](#171-cíl)
    - [1.7.2. Nápověda](#172-nápověda)
  - [1.8. 💡 Volitelné rozšířené úkoly](#18--volitelné-rozšířené-úkoly)
    - [1.8.1. Varianta A: Automatizace verzování](#181-varianta-a-automatizace-verzování)
      - [1.8.1.1. Cíl](#1811-cíl)
      - [1.8.1.2. Přínos](#1812-přínos)
      - [1.8.1.3. Postup řešení](#1813-postup-řešení)
    - [1.8.2. Varianta B: Notifikace o nasazení](#182-varianta-b-notifikace-o-nasazení)
      - [1.8.2.1. Cíl](#1821-cíl)
      - [1.8.2.2. Přínos](#1822-přínos)
      - [1.8.2.3. Postup řešení](#1823-postup-řešení)
    - [1.8.3. Varianta C: Performance testy](#183-varianta-c-performance-testy)
      - [1.8.3.1. Cíl](#1831-cíl)
      - [1.8.3.2. Přínos](#1832-přínos)
      - [1.8.3.3. Nápověda řešení](#1833-nápověda-řešení)

## 1.2. ⚙️ Prerekvizity a nastavení v průběhu řešení úkolů

### 1.2.1. Příprava vlastního repozitáře

1. Naklonujte si repozitář workshopu:

   ```bash
   git clone https://github.com/janblahacgi/vsb-vmswv-workshop-01.git
   ```

2. Vytvořte si nový repozitář na svém GitHub účtu (bez inicializace README). Pro bezplatnou verzi GitHub musí být repozitář vytvořen jako veřejný, aby bylo možno využívat gh-pages.

3. Změňte vzdálený repozitář (remote) na váš nový repozitář:

   ```bash
   git remote remove origin
   git remote add origin https://github.com/vaše-uživatelské-jméno/váš-nový-repozitář.git
   git push -u origin main
   ```

### 1.2.2. Nastavení GitHub Pages

1. Přejděte do nastavení vašeho repozitáře na GitHubu (Settings).
2. Vyberte záložku "Pages" v levém menu.
3. V sekci "Build and deployment":
   - Source: Nastavte "Deploy from a branch"
   - Branch: Vyberte "gh-pages" a "/ (root)" (**Bude existovat až po prvním spuštění workflow (GitHub Actions)**)
4. Klikněte na "Save".
5. Ujistěte se, že máte povoleny GitHub Actions/General:
   - Přejděte do záložky "Actions/General" v nastavení repozitáře
   - Vyberte možnost "Allow all actions and reusable workflows" (Pravděpodobně výchozí hodnota)
   - Vyberte možnost "Read and write permissions"
   - Zaškrtněte "Allow GitHub Actions to create and approve pull requests"

### 1.2.3. Nastavení branch protection rules na GitHubu pro větve `dev`, `test`, `uat` a `main`

Po vytvoření větví viz. [Úkol 1](#13--úkol-1-vytvoření-větví-pro-různá-prostředí)

1. Přejděte do "Settings/Branches"
2. Klikněte "Add classic branch protection rule"
3. Přidejte nové "Branch Protection Rule"
4. Nastavte pravidla pro konkrétní větev
   - Branch name pattern: vyplňte název větve (`dev`, `test`, `uat` nebo `main`)
   - zaškrtněte volby:
     - Require a pull request before merging
     - Do not allow bypassing the above settings
5. Uložte nastavení
6. Opakujte pro všechny větve

## 1.3. 🔧 Úkol 1: Vytvoření větví pro různá prostředí

### 1.3.1. Cíl

Vytvořit a správně nastavit větve pro tři prostředí nasazení:

- `dev` - vývojová větev
- `test` - testovací prostředí
- `uat` - uživatelské akceptační testování
- `main` - produkční větev

### 1.3.2. Nápověda

   ```bash
   git checkout -b dev
   git push --set-upstream origin dev
   ```

Ověření, že všechny větve existují:

   ```bash
   git branch -a
   ```

Po vytvoření větví provést [nastavení branch protection rules](#123-nastavení-branch-protection-rules-na-githubu-pro-větve-dev-test-uat-a-main)

## 1.4. 🔧 Úkol 2: Nasazení aplikace do všech prostředí

### 1.4.1. Cíl

Aplikaci nasadit do všech tří prostředí (test, UAT, produkce) a ověřit, že všechna nasazení fungují správně. Tímto krokem zajistíte, že máte funkční CI/CD pipeline a můžete začít vyvíjet aplikaci.

### 1.4.2. Nápověda

Prozkoumejte existující CI/CD workflow ve složce `.github/workflows/`:

- `ci-cd.yaml` - výchozí bod
- `deploy.yaml` - workflow pro nasazení aplikace
- `validate.yaml` - workflow pro validaci kódu

Ověřte, že aplikace je nasazena do všech prostředí:

- Test: `https://vaše-uživatelské-jméno.github.io/váš-repozitář/test`
- UAT: `https://vaše-uživatelské-jméno.github.io/váš-repozitář/uat`
- Prod: `https://vaše-uživatelské-jméno.github.io/váš-repozitář/prod`

## 1.5. 🔧 Úkol 3a: Implementace testů do CI pipeline

### 1.5.1. Cíl

CI/CD pipeline je již nakonfigurována, ale aktuálně neobsahuje spouštění testů. V aplikaci existuje záměrná chyba, kterou je potřeba odhalit a opravit pomocí automatických testů.

### 1.5.2. Nápověda

Vyzkoušejte si spuštění testů lokálně:

  ```bash
   pnpm test
   ```

Testy odhalí chybu v kódu.

Pro zařazení kroku "Tests" do pipeline se můžete inspirovat akcí `.github/actions/lint/action.yaml`.

K upravě využijte standardní GH flow, tedy vytvořte novou větev z `dev` (fix/oprava-chyby), proveďte změny a vytvořte pull request.

## 1.6. 🔧 Úkol 3b: Vývojový cyklus s rozšířeným GitHub Flow

### 1.6.1. Cíl

Projít si kompletní vývojový cyklus podle GitHub Flow od oparavy chyby (vývoje nové funkce) až po její nasazení do produkce.

### 1.6.2. Nápověda

Předchozí úkol odhalil "chybu v kódu". Vyřešte chybu a aplikujte celý vývojový cyklus

Dokončete PR z `fix/oprava-chyby` do `dev` a slučte jej.

Projděte postupně celým deployment procesem:

- Vytvořte PR z `dev` do `test`
- Po úspěšném testování vytvořte PR z `test` do `uat`
- Po ověření v UAT prostředí vytvořte PR z `uat` do `main`

Ověřte, že vaše změny byly nasazeny do všech prostředí:

- Test: `https://vaše-uživatelské-jméno.github.io/váš-repozitář/test`
- UAT: `https://vaše-uživatelské-jméno.github.io/váš-repozitář/uat`
- Prod: `https://vaše-uživatelské-jméno.github.io/váš-repozitář/prod`

## 1.7. 🔧 Úkol 5: Hotfix workflow

### 1.7.1. Cíl

Vyzkoušet si proces rychlé opravy kritické chyby v produkčním prostředí pomocí hotfix větve.

### 1.7.2. Nápověda

Simulujte situaci, kdy je v produkci objevena kritická chyba.

Pro potřeby cvičení považujme za kritickou chybu existenci tagu:

```js
<p className="text-center w-full">
              {import.meta.env.VITE_BUILD_FOR}
            </p>
```

Ověřte, že oprava je nasazena na všech prostředích a všechny větve jsou synchronizované.

## 1.8. 💡 Volitelné rozšířené úkoly

### 1.8.1. Varianta A: Automatizace verzování

#### 1.8.1.1. Cíl

Implementovat automatické verzování na základě Conventional Commits a generování CHANGELOG.md souboru, který sleduje všechny změny v projektu.

#### 1.8.1.2. Přínos

- 📊 Konzistentní a automatizované verzování aplikace
- 📝 Přehledná historie změn pro vývojáře i uživatele
- ⏱️ Zefektivnění procesu vydávání nových verzí
- 🔍 Lepší dohledatelnost změn a jejich účelu

#### 1.8.1.3. Postup řešení

1. Nainstalujte nástroj `standard-version` do projektu:

   ```bash
   pnpm add -D standard-version
   ```

2. Přidejte skript do `package.json`:

   ```json
   "scripts": {
     "release": "standard-version"
   }
   ```

3. Vytvořte konfigurační soubor `.versionrc.json` v kořenovém adresáři:

   ```json
   {
     "types": [
       {"type": "feat", "section": "Features"},
       {"type": "fix", "section": "Bug Fixes"},
       {"type": "docs", "section": "Documentation"},
       {"type": "style", "section": "Styles"},
       {"type": "refactor", "section": "Code Refactoring"},
       {"type": "perf", "section": "Performance Improvements"},
       {"type": "test", "section": "Tests"},
       {"type": "build", "section": "Build System"},
       {"type": "ci", "section": "CI/CD"},
       {"type": "chore", "hidden": true}
     ]
   }
   ```

4. Vytvořte GitHub Action pro automatické verzování (`.github/workflows/version.yaml`):

   ```yaml
   name: Automatic Versioning
   
   on:
     push:
       branches:
         - main
   
   jobs:
     version:
       runs-on: ubuntu-latest
       if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
       steps:
         - name: Checkout code
           uses: actions/checkout@v4
           with:
             fetch-depth: 0
         
         - name: Setup Environment
           uses: ./.github/actions/setup-env
           
         - name: Configure Git
           run: |
             git config --local user.email "action@github.com"
             git config --local user.name "GitHub Action"
             
         - name: Generate new version
           run: pnpm release
           
         - name: Push changes
           uses: ad-m/github-push-action@master
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             branch: ${{ github.ref }}
             tags: true
   ```

5. Vytvořte ukázkové commit messages podle konvence:
   - `feat: add new feature`
   - `fix: resolve bug in component`
   - `docs: update README`

6. Pushnete změny do `main` větve a pozorujte, jak se automaticky vytvoří nová verze a aktualizuje CHANGELOG.md.

### 1.8.2. Varianta B: Notifikace o nasazení

#### 1.8.2.1. Cíl

Zlepšit viditelnost nasazení prostřednictvím automatických notifikací, které informují tým o úspěšném či neúspěšném nasazení do jednotlivých prostředí.

#### 1.8.2.2. Přínos

- 🔔 Lepší informovanost celého týmu o stavu nasazení
- ⚡ Rychlejší reakce na případné problémy
- 👁️ Zvýšení transparentnosti procesu nasazování
- 🤝 Usnadnění koordinace mezi vývojáři a testery

#### 1.8.2.3. Postup řešení

1. Upravte soubor `.github/workflows/deploy.yaml` a přidejte kroky pro notifikace:

   ```yaml
   name: Deploy
   on:
     workflow_call:
       inputs:
         environment:
           required: true
           type: string
           description: "Target environment (test, uat, prod)"
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       environment:
         name: ${{ inputs.environment }}
         url: https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/${{ inputs.environment }}
       steps:
         - name: Checkout repository
           uses: actions/checkout@v4
   
         - name: Setup Environment
           uses: ./.github/actions/setup-env
   
         - name: Build App
           uses: ./.github/actions/build
           with:
             environment: ${{ inputs.environment }}
   
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v4
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
             destination_dir: ${{ inputs.environment }}
             
         - name: Find Pull Request
           uses: jwalton/gh-find-current-pr@v1
           id: findPr
           with:
             github-token: ${{ secrets.GITHUB_TOKEN }}
             
         - name: Add deployment comment to PR
           if: steps.findPr.outputs.pr
           uses: actions/github-script@v6
           with:
             github-token: ${{ secrets.GITHUB_TOKEN }}
             script: |
               const prNumber = ${{ steps.findPr.outputs.pr }}
               const env = '${{ inputs.environment }}'
               const url = 'https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/${{ inputs.environment }}'
               
               github.rest.issues.createComment({
                 owner: context.repo.owner,
                 repo: context.repo.repo,
                 issue_number: prNumber,
                 body: `🚀 Deployment to **${env}** environment completed successfully!\n\n📝 **Deployment URL:** [${url}](${url})\n\n⏱️ Deployed at: ${new Date().toISOString()}`
               })
   ```

2. Vyzkoušejte nasazení:
   - Vytvořte PR z `dev` do `test`
   - Sledujte, jak se automaticky přidá komentář s odkazem na nasazené prostředí

### 1.8.3. Varianta C: Performance testy

#### 1.8.3.1. Cíl

Přidat do CI/CD pipeline automatické výkonnostní testy, které budou sledovat a vyhodnocovat výkon aplikace před nasazením do produkce.

#### 1.8.3.2. Přínos

- 📈 Včasné odhalení výkonnostních problémů
- 🛡️ Zabránění regresím ve výkonu aplikace
- 📊 Kontinuální sledování trendu výkonu
- 🏆 Objektivní metriky pro hodnocení kvality kódu

#### 1.8.3.3. Nápověda řešení

1. Nainstalujte nástroj Lighthouse CI pro měření výkonu:

   ```bash
   pnpm add -D @lhci/cli
   ```

2. Vytvořte konfigurační soubor `lighthouserc.js` v kořenovém adresáři:

   ```javascript
   module.exports = {
     ci: {
       collect: {
         staticDistDir: './dist',
         numberOfRuns: 3,
       },
       upload: {
         target: 'temporary-public-storage',
       },
       assert: {
         preset: 'lighthouse:recommended',
         assertions: {
           'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
           'interactive': ['error', { maxNumericValue: 3500 }],
           'max-potential-fid': ['warn', { maxNumericValue: 100 }],
           'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
           'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
         },
       },
     },
   };
   ```

3. Přidejte skript do `package.json`:

   ```json
   "scripts": {
     "lhci": "lhci autorun"
   }
   ```

4. Vytvořte novou action pro performance testy (`.github/actions/performance/action.yaml`):

   ```yaml
   name: "Performance Tests"
   description: "Run Lighthouse performance tests"

   runs:
     using: "composite"
     steps:
       - name: Install Chrome
         run: |
           wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
           sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
           sudo apt-get update
           sudo apt-get -y install google-chrome-stable
         shell: bash

       - name: Run Lighthouse CI
         run: pnpm lhci
         shell: bash
   ```

5. Přidejte kroky pro testování výkonu do workflow pro deploy (`.github/workflows/deploy.yaml`):

   ```yaml
   # ...předchozí kroky...
   
   - name: Build App
     uses: ./.github/actions/build
     with:
       environment: ${{ inputs.environment }}
   
   - name: Run Performance Tests
     if: inputs.environment == 'prod'
     uses: ./.github/actions/performance
   
   - name: Deploy to GitHub Pages
     uses: peaceiris/actions-gh-pages@v4
     with:
       github_token: ${{ secrets.GITHUB_TOKEN }}
       publish_dir: ./dist
       destination_dir: ${{ inputs.environment }}
   
   # ...další kroky...
   ```

6. Vytvořte PR z `uat` do `main` a sledujte, jak se automaticky spustí výkonnostní testy před nasazením do produkce.

7. Analyzujte výsledky testů, které jsou k dispozici v logu GitHub Actions a na dočasném úložišti Lighthouse CI.

8. Pro pokročilou implementaci můžete přidat ukládání historických dat o výkonu pomocí Lighthouse CI serveru nebo jiného nástroje pro ukládání dat.
