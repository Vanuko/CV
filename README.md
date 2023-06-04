# CV
Projekta uzstādīšana:
Šis projekts ir veidots Uz Vue 3 Framework, izmantojot XAMPP UN PHP KODU.
Koda izveide tika veikta izmantojot Visual Studio Code.

Soļi kas jāveic lai uzstādītu projektu:
1)Uzstādīt Node.js
Šī projeckta ietvaros tika izmantota Node.js v16.15.1 versija.

2)Folderī uzstādīt vue cli pakotni, ja nepieciešams.
Dodoties iekšā projektā front-end/cv-project un palaist komandu no termināla:
npm install @vue/cli

4) Iekšā /cv-project palaist komandu: npm i
Lai uzstādītu nepieciešamās pakotnes

5)Lejupielāde XAMPP kontrol paneli versiju: 7.4.30
Xampp folderi ekstraktot (C:)diskā
https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/7.4.30/

6)Pēc Lejupielādes sekot norādītajam path: C:\xampp\htdocs
Šeit tiks ievietots backend.php fails.
Šo failu var atrasts back-end folderī.
backend.php failu nokopēt un kopiju ievietot htdocs folderī

7)Doties uz xampp folderi un palaist xampp-control.exe

8)Pēc XAMPP CONTROL PANEL atvēršanas jāpalaiž "Apache" un "MySql" servisi

9)Doties pārlūkprogramma un atvērt linku http://127.0.0.1/phpmyadmin/index.php

10)Izveidot jaunu datubāzi ar nosaukumu "cv_form" un "utf8_latvian_ci"

11)Pēc datubāzes izveides importēt failu "cv_form.sql" no /back-end folderi ar pogu import un atstāt default uzstādijumus

12)Tad doties atpakaļ uz front-end/cv-project folder un no turienes palaist komanu: npm run serve

Tad projectam vajadzētu būt skatāmam http://localhost:8080/, ja port uzstādijumi nav mainīti