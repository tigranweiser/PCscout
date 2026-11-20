# PCScout veröffentlichen

Diese Version enthält die vollständige Website mit 36 HTML-Seiten, darunter alle 13 Ratgeber. Die Suchmaschinensperre wurde aus allen Seiten entfernt. Ein Build oder eine Installation ist nicht erforderlich.

## 1. Dateien hochladen

Entpacke PCScout_Live.zip. Öffne dein PCScout-Repository auf GitHub und wähle **Add file → Upload files**. Ziehe alle entpackten Dateien und Ordner hinein und bestätige mit **Commit changes**.

`index.html`, `assets`, `ratgeber`, `gaming-pcs` und `pc-teile` müssen direkt im Hauptverzeichnis liegen. Lade den Inhalt des entpackten Ordners hoch. Die ZIP selbst und die alte Datei PCScout_Vorschau.html sind keine Startseite.

## 2. Website einschalten

Gehe zu **Settings → Pages**. Wähle bei Source **Deploy from a branch**, dann deinen Hauptbranch (meist `main`) und **/(root)**. Klicke auf **Save**. Nach erfolgreicher Bereitstellung zeigt GitHub unter Pages den Link zur Website.

Die internen Links, Bilder und Schriften funktionieren auch unter einer GitHub-Projektadresse. Wenn schon eine eigene Domain eingerichtet ist, behalte diese Einstellung bei.

## 3. PCScout.com verbinden

Als Hauptadresse für Google sind `https://pcscout.com/` und die dazugehörigen Unterseiten eingetragen. Damit die Website unter dieser Domain erreichbar wird, muss sie mit diesem Repository verbunden sein.

Falls noch nicht eingerichtet: Unter **Settings → Pages → Custom domain** `pcscout.com` eintragen und speichern. GitHub legt dabei die Datei `CNAME` an. Beim Domainanbieter die A-Einträge für die Hauptdomain (`@`) auf diese vier GitHub-Pages-Adressen setzen:

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

Für `www` einen CNAME auf die von GitHub angegebene Benutzer-Domain setzen (`BENUTZERNAME.github.io`, ohne Repository-Pfad). Bereits vorhandene widersprechende Website-A/AAAA-Einträge oder Weiterleitungen berücksichtigen; Mail-Einträge nicht verändern. Wenn GitHub die Domain und das Zertifikat bestätigt, **Enforce HTTPS** aktivieren.

Dieses Paket erzwingt die eigene Domain nicht vorzeitig: Es enthält keine voreingestellte CNAME-Datei. Wenn bereits eine CNAME-Datei im Repository liegt, bleibt sie beim Hochladen erhalten. Die github.io-Adresse eignet sich zur Vorschau; für den geplanten Google-Auftritt soll PCScout.com erreichbar sein.

## 4. Google die Website zeigen

Sobald PCScout.com erreichbar ist, die Domain in der Google Search Console bestätigen und `https://pcscout.com/sitemap.xml` einreichen. Alle Inhalte und Links stehen direkt im HTML. Google entscheidet selbst über Aufnahme und Platzierung; der Upload allein garantiert keine Rankings.

## Später aktualisieren

Die Preise und Prüfstände sind aus deiner zuletzt freigegebenen Version übernommen. Änderungen am sichtbaren Preis auch in zugehörigen Übersichten und strukturierten Angebotsdaten nachziehen. Für neue Affiliate-Links die Kennzeichnung beim Link und passende `rel="sponsored"`-Attribute ergänzen.

Die Datei .nojekyll gehört zum Paket. Bilder und Schriftdateien werden lokal mitgeliefert. Unter assets/fonts liegt die Lizenz der Schrift. Im öffentlichen Menü erscheinen keine Projektanleitungen.

## Offizielle Hilfen

- GitHub Pages aktivieren: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Eigene Domain: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- Google Search Console und Sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
