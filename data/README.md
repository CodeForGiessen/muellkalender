# Datascraping für den Müllkalender
Aufwand: ca 4-5 Stunden pro Jahr
Werkzeuge
* Excel oder LibreOffice
* Einen Online PDF to Excel Scraper

## Rohdatenbesorgung
Die PDFs unter http://www.giessen.de/Umwelt_und_Verkehr/Abfallwirtschaft_und_Stra%C3%9Fenreinigung/Abfuhrkalender/ herunterladen.
*Der Webmüllkalender ist leider nicht zu gebrauchen, weil er nur die allgemeinen Fälle abdeckt.*
* Straßenverzeichnis
* Müllkalender Montag
* Müllkalender Dienstag
* Müllkalender Mittwoch
* Müllkalender Donnerstag
* Müllkalender Freitag

## Rohdaten in Zwischenformat bringen
Die Rohdaten müssen nun in ein maschinenlesbares Zwischenformat gebracht werden.

### Straßenverzeichnis
Aufwand: 20-30 Minuten

Das Straßenverzeichnis befindet sich schon in einem recht gut verarbeitbarem Format. 

Die PDF einen PDF-To-Excel Online Scraper geben. Ich habe https://www.pdftoexcelonline.com/de/ verwendet.

Die einzelnen Sheets bzw. Seiten der Exceldatei müssen nun in ein Sheet gebracht werden.

Einfach die Zeilen und Spalten aus den Seiten 2 bis ++ in die Seite 1 anfügen.
1. Zellen markieren und kopieren
2. Erste linke frei Zelle auf der Seite 1 anklicken und einfügen

**Die Kopfzeilen entfernen. Auch auf Seite 1**

Nun als CSV-Datei mit den folgenden Einstellungen exportieren und im Ordner *handscraper* speichern.
* Fielddelimiter: ,
* Textdelimiter: "
* Quote all text cells

### Müllabfuhrkalender (Tag)
Aufwand: 1 Stunde pro Tag


#### Vorbereitung
**Tipp: Ausdrucken vereinfacht das Übertragen enorm**

1. Exceldatei von den letzten Jahr kopieren.
2. Inhalt löschen (außer Kopfzeile)
3. Spalte A als Datumsfeld formatieren (dd.mm.yyyy)
4. Alle anderen Spalten als Text formatieren 
5. Zelle A2 (=DATE(JAHR EINTRAGEN,1,1)) eintragen evt. weicht die Formel in Excel ab
6. Zelle A3 (=A2+1) eintragen
7. Zelle A3 nun markieren und bis zur Zelle A366 ziehen (es sollte ein Kalender entstehen)
8. Nun die Tage markieren die kritisch sind (In der PDF meist rot umrandet oder mit Namen versehen) z.B. Weihnachten, Feiertage, ...

#### Mülltonnen (grau,blau,gelb,grün)
**Achtung: Die grüne Tonne wird ab April wöchentlich und ab November wieder 2-wöchentlich geleert**
**Buchstaben so hinschreiben, Zahlen mit Hochkomma einpacken (Damit sie nicht als Zahl interpretiert werden)**
1. Das Muster erkennen 
2. Eine Reihenfolge markieren (z.B Tag mit einer 1 (oder a ...) markieren und die Markierung wieder bis zur nächsten 1 ziehen **Aber Minus einen Tag**)
3. Die Auswahl nun bis zum letzten Tag ziehen
4. Ein paar Tage vergleichen
5. Das für alle Mülltonnen machen

#### Sonderfälle, Sperrmüll
Alle Tage mit Sondernfällen überprüfen und ggf. verschieben

Sperrmüll eintragen (Ist kein richtiger Zyklus)
**Achtung: manchmal wechseln die Tage von Dienstag auf Mittwoch**

Weihnachtsabholtermine und Astwerkabholung

#### Exportieren
Nun als CSV-Datei mit den folgenden Einstellungen exportieren und im Ordner *handscraper* speichern.
* Fielddelimiter: ,
* Textdelimiter: "
* Quote all text cells





