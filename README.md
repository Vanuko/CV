# CV
Projekta uzstādīšana:
Šis projekts ir izveidots, izmantojot Vue 3 framework, XAMPP un PHP kodu. 
Koda izveide tika veikta, izmantojot Visual Studio Code.

Uzstādīšanas norādes
Lai uzstādītu šo projektu, sekojiet zemāk norādītajiem soļiem:

1)Uzstādīt Node.js. Šis projekts ir izstrādāts, izmantojot Node.js v16.15.1 versiju. Lai to lejupielādētu, apmeklējiet oficiālo Node.js mājaslapu un veiciet instalāciju.

2)Dodieties uz projekta front-end/cv-project mapi un terminālā izpildiet šo komandu, lai uzstādītu Vue CLI pakotni, ja tā vēl nav uzstādīta: npm install @vue/cli

4)Iekš front-end/cv-project mapes izpildiet komandu npm install, lai uzstādītu nepieciešamās pakotnes projektam.

5)Lejupielādējiet XAMPP kontrolpaneli versiju: 7.4.30
Ekstraktējiet XAMPP failus un novietojiet tos C diska saknes mapē (C:/).
https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/7.4.30/

6)Pārliecinieties, ka XAMPP mape atrodas šeit: C:\xampp\htdocs. Ievietojiet back-end mape esošo backend.php failu šajā htdocs mapē.

7)Palaidiet XAMPP kontrolpaneli, atverot xampp-control.exe failu, kas atrodas XAMPP mapē.

8)XAMPP kontrolpanelī palaidiet "Apache" un "MySQL" servisus.

9)Atveriet jebkuru pārlūkprogrammu un ievadiet šo adresi:
http://127.0.0.1/phpmyadmin/index.php.

10)Izveidojiet jaunu datubāzi ar nosaukumu "cv_form" un "utf8_latvian_ci" uzstādijumu.

11)Pēc datubāzes izveidošanas importējiet "cv_form.sql" failu no back-end mapes, izmantojot phpMyAdmin "Import" pogu. Atstājiet noklusējuma iestatījumus.

12)Atgriezieties pie "front-end/cv-project" mapes un izpildiet šo komandu terminālī: npm run serve

Pēc šo norāžu ievērošanas projekts būs gatavs, un jūs varat apskatīt to vietni: http://localhost:8080/

