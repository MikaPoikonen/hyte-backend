``` mermaid
%%{init: {'theme':'default'}}%%
graph TD;
Käyttäjä-->|Tunnistaudu|Autentikaatio
Autentikaatio-->|Pääsy sovellukseen|Sovellus
Käyttäjä-->|Mittaus|Mobilephone
Mobilephone-->|Tallennus|Kubios
Sovellus-->|Tunnistaudu|Backend
Backend-->|Tiedon haku|Kubios
Kubios-->|Tiedon anto|Backend
Backend-->|Tiedon anto|Sovellus
Sovellus-->|Kirjoita analyysi|Päiväkirja
Päiväkirja-->|Esitä analyysi|Käyttäjä
```
